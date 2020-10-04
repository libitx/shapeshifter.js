import { Buffer } from 'buffer'
import { Tx } from 'bsv'
import 'core-js/features/array/flat-map'
import TXO from './txo'
import BOB from './bob'


/**
 * TODO
 */
class Shapeshifter {
  /**
   * TODO
   */
  constructor(src) {
    try {
        // If hex string or buffer, parse as tx object
      if (typeof src === 'string' && src.match(/^[a-f0-9]+$/)) {
        src = Tx.fromHex(src)
      } else if (Buffer.isBuffer(src)) {
        src = Tx.fromBuffer(src)
      }
    } catch(e) {
      throw 'The source tx is not a valid Bitcoin transaction.'
    }

    // Determine format
    if (Array.isArray(src.txIns) && Array.isArray(src.txOuts)) {
      this.src = src.clone()
      this.format = 'tx'
    } else if (Array.isArray(src.in) && Array.isArray(src.out)) {
      this.src = JSON.parse(JSON.stringify(src))
      this.format = src.out.some(o => Array.isArray(o.tape)) ?
        'bob' :
        'txo'
    } else {
      throw 'The source tx is not a valid Bitcoin transaction.'
    }
  }

  /**
   * TODO
   */
  static toBuffer(src) {
    return new this(src).toBuffer()
  }

  /**
   * TODO
   */
  static toHex(src) {
    return new this(src).toHex()
  }

  /**
   * TODO
   */
  static toTx(src) {
    return new this(src).toTx()
  }

  /**
   * TODO
   */
  static toTxo(src) {
    return new this(src).toTxo()
  }

  /**
   * TODO
   */
  static toBob(src) {
    return new this(src).toBob()
  }

  /**
   * TODO
   */
  toBuffer() {
    return this.toTx().toBuffer()
  }

  /**
   * TODO
   */
  toHex() {
    return this.toTx().toHex()
  }

  /**
   * TODO
   */
  toTx() {
    switch(this.format) {
      case 'tx':
        return this.src
      case 'txo':
        return TXO.toTx(this)
      case 'bob':
        return BOB.toTx(this)
    }
  }

  /**
   * TODO
   */
  toTxo() {
    switch(this.format) {
      case 'tx':
        return TXO.fromTx(this)
      case 'txo':
        return this.src
      case 'bob':
        return TXO.fromBob(this)
    }
  }

  /**
   * TODO
   */
  toBob() {
    switch(this.format) {
      case 'tx':
        return BOB.fromTx(this)
      case 'txo':
        return BOB.fromTxo(this)
      case 'bob':
        return this.src
    }
  }
}

export default Shapeshifter