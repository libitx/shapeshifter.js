import { Buffer } from 'buffer'
import { Address, Bn, OpCode, PubKey, Script, Tx, TxIn, TxOut, VarInt } from 'bsv'

/**
 * BOB serialization helpers. 
 */
const BOB = {
  /**
   * Creates a new BOB serialized transaction from the given Shapeshifter.
   *
   * @param {Shapeshifter} shapeshifter
   * @returns {Object}
   */
  fromTx({ src, format }) {
    if (format !== 'tx') throw 'The src tx is not a valid Tx object';
    const txid = src.id()
    const ins = src.txIns.map(this.inputFromTx)
    const outs = src.txOuts.map(this.outputFromTx)
    return {
      tx: { h: txid },
      in: ins,
      out: outs,
      lock: src.nLockTime
    }
  },

  /**
   * Creates a new BOB serialized transaction from the given Shapeshifter.
   *
   * @param {Shapeshifter} shapeshifter
   * @returns {Object}
   */
  fromTxo({ src, format }) {
    if (format !== 'txo') throw 'The src tx is not a valid TXO object';
    const ins = src.in.map(this.inputFromTxo)
    const outs = src.out.map(this.outputFromTxo)

    const bob = { ...src, in: ins, out: outs }
    delete bob._id
    return bob
  },

  /**
   * Creates a new BOB formatted input from the given TxIn object.
   *
   * @param {TxIn} src Source input
   * @param {Number} index Input index
   * @returns {Object}
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
   * Creates a new BOB formatted input from the given TXO input object.
   *
   * @param {Object} src Source input
   * @returns {Object}
   */
  inputFromTxo(src) {
    return fromTxoObject(src)
  },

  /**
   * Creates a new BOB formatted output from the given TxOut object.
   *
   * @param {TxOut} src Source output
   * @param {Number} index Output index
   * @returns {Object}
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
   * Creates a new BOB formatted output from the given TXO output object.
   *
   * @param {Object} src Source output
   * @returns {Object}
   */
  outputFromTxo(src) {
    return fromTxoObject(src)
  },

  /**
   * Creates a new Tx object from the given Shapeshifter.
   *
   * @param {Shapeshifter} shapeshifter
   * @returns {Tx}
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
   * Creates a new TxIn object from the given BOB input.
   *
   * @param {Object} src BOB formatted input
   * @returns {TxIn}
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
   * Creates a new TxOut object from the given BOB output.
   *
   * @param {Object} src BOB formatted output
   * @returns {TxOut}
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
 * Reducer function converts a BSV Script chunk to BOB parameters.
 * @private
 */
function fromScriptChunk({tape, t}, chunk, index) {
  const n = tape.length - 1
  const i = tape[n].i

  // Handle Buffer
  if (chunk.buf) {
    if (chunk.buf.toString() === '|') {
      tape.push({ i: i+1 })
      return { tape, t: index + 1 }

    } else {
      tape[n].cell = tape[n].cell || []
      tape[n].cell.push({
        b: chunk.buf.toString('base64'),
        h: chunk.buf.toString('hex'),
        s: chunk.buf.toString(),
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
      return { tape, t: index + 1 }
    } else {
      return { tape, t }
    }
  }
}

/**
 * Creates a BOB formatted input or output from the given TXO src.
 * @private
 */
function fromTxoObject(src) {
  const {i, seq, e} = src
  const target = {i, seq, e}
  Object.keys(target).forEach(key => {
    target[key] === undefined ? delete target[key] : {}
  })

  const { tape } = [...Array(src.len).keys()]
    .reduce(({tape, t}, index) => {
      const cell = ['o', 'b', 'h', 's', 'f']
        .reduce((tgt, k) => {
          if (src[k+index]) tgt[k] = src[k+index];
          return tgt
        }, { ii: index })
      return fromTxoAttr(cell, {tape, t})
    }, { tape: [{i: 0}], t: 0 })

  return { ...target, tape }
}

/**
 * Creates a BOB formatted cell from the given TXO attr.
 * @private
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
 * Reducer function converts a BOB tape to a BSV Tx script.
 * @private
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