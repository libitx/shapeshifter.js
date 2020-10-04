import { Buffer } from 'buffer'
import { Address, Bn, OpCode, PubKey, Script, Tx, TxIn, TxOut, VarInt } from 'bsv'

const TXO = {
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
  fromBob({ src: tx }) {
    const ins = tx.in.map(this.inputFromBob)
    const outs = tx.out.map(this.outputFromBob)

    const txo = { ...tx, in: ins, out: outs }
    delete txo._id
    return txo
  },

  /**
   * TODO
   */
  inputFromTx(src, index) {
    const address = src.script.isPubKeyHashIn() ?
      Address.fromPubKey(PubKey.fromBuffer(src.script.chunks[1].buf)).toString() :
      false;

    const input = {
      i: index,
      e: {
        h: src.txHashBuf.reverse().toString('hex'),
        i: src.txOutNum,
        a: address
      },
      seq: src.nSequence,
      len: src.script.chunks.length
    }

    return src.script.chunks
      .reduce(fromScriptChunk, input)
  },

  /**
   * TODO
   */
  inputFromBob(src) {
    return fromBobTape(src)
  },

  /**
   * TODO
   */
  outputFromTx(src, index) {
    const address = src.script.isPubKeyHashOut() ?
      Address.fromPubKeyHashBuf(src.script.chunks[2].buf).toString() :
      false;

    const output = {
      i: index,
      e: {
        v: src.valueBn.toNumber(),
        i: index,
        a: address
      },
      len: src.script.chunks.length
    }

    return src.script.chunks
      .reduce(fromScriptChunk, output)
  },

  /**
   * TODO
   */
  outputFromBob(src) {
    return fromBobTape(src)
  },

  /**
   * TODO
   */
  toTx({ src, format }) {
    if (format !== 'txo') throw 'The src tx is not a valid TXO object';
    const txIns = src.in.map(this.toTxIn)
    const txOuts = src.out.map(this.toTxOut)

    new Tx()

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
    const script = toTxScript(src)
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
    const script = toTxScript(src)
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
function fromScriptChunk(obj, chunk, index) {
  // Handle Buffer
  if (chunk.buf) {
    obj[`s${index}`] = chunk.buf.toString()
    obj[`h${index}`] = chunk.buf.toString('hex')
    obj[`b${index}`] = chunk.buf.toString('base64')
  }
  // Handle opcode
  else {
    obj[`o${index}`] = OpCode.str[chunk.opCodeNum]
  }

  return obj
}

/**
 * TODO
 */
function fromBobTape(src) {
  const target = src.tape
    .flatMap(t => t.cell)
    .reduce(fromBobCell, { ...src, len: 0 })

  delete target.tape
  return target
}

/**
 * TODO
 */
function fromBobCell(obj, cell) {
  const expectedIndex = obj.len
  const index = cell.ii

  if (expectedIndex === index) {
    obj.len++
  } else if (expectedIndex < index) {
    obj[`s${expectedIndex}`] = '|'
    obj[`h${expectedIndex}`] = Buffer.from('|').toString('hex')
    obj[`b${expectedIndex}`] = Buffer.from('|').toString('base64')
    obj.len++
    return fromBobCell(obj, cell)
  }

  if (cell.ops) {
    obj[`o${index}`] = cell.ops
  } else {
    obj[`s${index}`] = cell.s
    obj[`h${index}`] = cell.h
    obj[`b${index}`] = cell.b
  }

  return obj
}

/**
 * TODO
 */
function toTxScript(src) {
  return [...Array(src.len).keys()]
    .reduce((script, index) => {
      if (src[`o${index}`])       { script.writeOpCode(OpCode[src[`o${index}`]]) }
      else if (src[`b${index}`])  { script.writeBuffer(Buffer.from(src[`b${index}`], 'base64')) }
      else if (src[`h${index}`])  { script.writeBuffer(Buffer.from(src[`h${index}`], 'hex')) }
      return script
    }, new Script())
}

export default TXO