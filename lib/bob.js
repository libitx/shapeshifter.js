import { Address, Bn, OpCode, PubKey, Script, Tx, TxIn, TxOut, VarInt } from 'bsv'

/**
 * TODO
 */
const BOB = {
  /**
   * TODO
   */
  fromTx({ src: tx }) {
    const txid = tx.id()
    const ins = tx.txIns.map(this.inputFromTx)
    const outs = tx.txOuts.map(this.outputFromTx)
    return {
      tx: { h: txid },
      in: ins,
      out: outs,
      lock: tx.nLockTime
    }
  },

  /**
   * TODO
   */
  fromTxo({ src: tx }) {
    const ins = tx.in.map(this.inputFromTxo)
    const outs = tx.out.map(this.outputFromTxo)

    const bob = { ...tx, in: ins, out: outs }
    delete bob._id
    return bob
  },

  /**
   * TODO
   */
  inputFromTx(src, index) {
    const address = src.script.isPubKeyHashIn() ?
      Address.fromPubKey(PubKey.fromBuffer(src.script.chunks[1].buf)).toString() :
      false;

    let { tape } = src.script.chunks
      .reduce(fromScriptChunk, { tape: [{i: 0}], t: 0 })
    tape = tape.filter(o => o.cell)

    return {
      i: index,
      seq: src.nSequence,
      e: {
        h: src.txHashBuf.reverse().toString('hex'),
        i: src.txOutNum,
        a: address
      },
      tape
    }
  },

  /**
   * TODO
   */
  inputFromTxo(src) {
    return fromTxoObject(src)
  },

  /**
   * TODO
   */
  outputFromTx(src, index) {
    const address = src.script.isPubKeyHashOut() ?
      Address.fromPubKeyHashBuf(src.script.chunks[2].buf).toString() :
      false;

    let { tape } = src.script.chunks
      .reduce(fromScriptChunk, { tape: [{i: 0}], t: 0 })
    tape = tape.filter(o => o.cell)

    return {
      i: index,
      e: {
        v: src.valueBn.toNumber(),
        i: index,
        a: address
      },
      tape
    }
  },

  /**
   * TODO
   */
  outputFromTxo(src) {
    return fromTxoObject(src)
  },

  /**
   * TODO
   */
  toTx({ src, format }) {
    if (format !== 'bob') throw 'The src tx is not a valid BOB object';
    const txIns = src.in.map(this.toTxIn)
    const txOuts = src.out.map(this.toTxOut)

    return Tx.fromObject({
      versionBytesNum: 1,
      txIns,
      txInsVi: VarInt.fromNumber(txIns.length),
      txOuts,
      txOutsVi: VarInt.fromNumber(txOuts.length),
      nLockTime: src.lock
    })
  },

  /**
   * TODO
   */
  toTxIn(src) {
    const { script } = src.tape.reduce(toTxScript, {
      script: new Script(),
      last: src.tape.length - 1
    })

    return TxIn.fromObject({
      txHashBuf: Buffer.from(src.e.h, 'hex').reverse(),
      txOutNum: src.e.i,
      nSequence: src.seq,
      script: script,
      scriptVi: VarInt.fromNumber(script.toBuffer().length)
    })
  },

  /**
   * TODO
   */
  toTxOut(src) {
    const { script } = src.tape.reduce(toTxScript, {
      script: new Script(),
      last: src.tape.length - 1
    })

    return TxOut.fromObject({
      valueBn: new Bn(src.e.v),
      script: script,
      scriptVi: VarInt.fromNumber(script.toBuffer().length)
    })
  }
}


/**
 * TODO
 */
function fromScriptChunk({tape, t}, chunk, index) {
  const n = tape.length - 1
  const i = tape[n].i

  // Handle Buffer
  if (chunk.buf) {
    if (chunk.buf.toString() === '|') {
      tape.push({ i: i+1 })
      return { tape, t: index }

    } else {
      tape[n].cell = tape[n].cell || []
      tape[n].cell.push({
        s: chunk.buf.toString(),
        h: chunk.buf.toString('hex'),
        b: chunk.buf.toString('base64'),
        i: index - t,
        ii: index
      })
      return { tape, t }
    }
  }

  // Handle opcode
  else {
    tape[n].cell = tape[n].cell || []
    tape[n].cell.push({
      op: chunk.opCodeNum,
      ops: OpCode.str[chunk.opCodeNum],
      i: index - t,
      ii: index
    })

    if (chunk.opCodeNum === OpCode.OP_RETURN) {
      tape.push({ i: i+1 })
      return { tape, t: index }
    } else {
      return { tape, t }
    }
  }
}

/**
 * TODO
 */
function fromTxoObject(src) {
  const {i, seq, e} = src
  const target = {i, seq, e}
  Object.keys(target).forEach(key => {
    target[key] === undefined ? delete target[key] : {}
  })

  const { tape } = [...Array(src.len).keys()]
    .reduce(({tape, t}, index) => {
      const cell = ['o', 's', 'h', 'b']
        .reduce((tgt, k) => {
          if (src[k+index]) tgt[k] = src[k+index];
          return tgt
        }, { ii: index })
      return fromTxoAttr(cell, {tape, t})
    }, { tape: [{i: 0}], t: 0 })

  return { ...target, tape }
}

/**
 * TODO
 */
function fromTxoAttr(attr, {tape, t}) {
  const n = tape.length - 1
  const i = tape[n].i
  const index = attr.ii

  // Handle opcode
  if (attr.o) {
    tape[n].cell = tape[n].cell || []
    tape[n].cell.push({
      op: OpCode[attr.o],
      ops: attr.o,
      i: index - t,
      ii: index
    })

    if (attr.o === 'OP_RETURN') {
      tape.push({ i: i+1 })
      return { tape, t: index + 1 }
    } else {
      return { tape, t }
    }

  // Handle pipe
  } else if (attr.s === '|') {
    tape.push({ i: i+1 })
    return { tape, t: index + 1 }

  // Everything else
  } else {
    tape[n].cell = tape[n].cell || []
    tape[n].cell.push({ ...attr, i: index - t })
    return { tape, t }
  }
}

/**
 * TODO
 */
function toTxScript({ script, last }, { cell, i }) {
  const n = cell.length - 1

  cell.forEach(c => {
    if (c.ops)    { script.writeOpCode(c.op) }
    else if (c.b) { script.writeBuffer(Buffer.from(c.b, 'base64')) }
    else if (c.h) { script.writeBuffer(Buffer.from(c.h, 'hex')) }
  })

  if (i < last && cell[n].op !== OpCode.OP_RETURN) {
    script.writeBuffer(Buffer.from('|'))
  }

  return { script, last }
}

export default BOB