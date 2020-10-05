import { Buffer } from 'buffer'
import { Tx } from 'bsv'
import 'core-js/features/array/flat-map'
import TXO from './txo'
import BOB from './bob'


/**
 * Shapeshifter lets you quickly and simply switch between Bitcoin transaction
 * formats.
 */
class Shapeshifter {
  /**
   * Creates a new Shapeshifter instance from the given transaction.
   *
   * Accepts either a raw hex string, raw Buffer, BSV Tx object, or TXO or BOB
   * serialization formats.
   *
   * @param {String | Buffer | Tx | Object} src Source tx
   * @constructor
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
   * Converts the given transaction to a raw tx Buffer.
   *
   * @param {String | Buffer | Tx | Object} src Source tx
   * @returns {Buffer}
   */
  static toBuffer(src) {
    return new this(src).toBuffer()
  }

  /**
   * Converts the given transaction to a raw hex String.
   *
   * @param {String | Buffer | Tx | Object} src Source tx
   * @returns {String}
   */
  static toHex(src) {
    return new this(src).toHex()
  }

  /**
   * Converts the given transaction to a structured BSV Tx object.
   *
   * @param {String | Buffer | Tx | Object} src Source tx
   * @returns {Tx}
   */
  static toTx(src) {
    return new this(src).toTx()
  }

  /**
   * Converts the given transaction to a TXO formatted object.
   *
   * @param {String | Buffer | Tx | Object} src Source tx
   * @returns {Object}
   */
  static toTxo(src) {
    return new this(src).toTxo()
  }

  /**
   * Converts the given transaction to a BOB formatted object.
   *
   * @param {String | Buffer | Tx | Object} src Source tx
   * @returns {Object}
   */
  static toBob(src) {
    return new this(src).toBob()
  }

  /**
   * Converts the Shapeshifter to a raw tx Buffer.
   *
   * @returns {Buffer}
   */
  toBuffer() {
    return this.toTx().toBuffer()
  }

  /**
   * Converts the Shapeshifter to a raw hex String.
   *
   * @returns {String}
   */
  toHex() {
    return this.toTx().toHex()
  }

  /**
   * Converts the Shapeshifter to a structured BSV Tx object.
   *
   * @returns {Tx}
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
   * Converts the Shapeshifter to a TXO formatted object.
   *
   * @returns {Object}
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
   * Converts the Shapeshifter to a BOB formatted object.
   *
   * @returns {Object}
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