import { assert } from 'chai'
import { Tx } from 'bsv'
import Shapeshifter from '../lib/shapeshifter'
import * as ttx from './support/test_tx.js'
import * as ttxp from './support/test_pipe_tx.js'


describe('new Shapeshifter()', () => {
  it('handles valid rawtx in hex format', () => {
    const shifter = new Shapeshifter(ttx.rawtx)
    assert.equal(shifter.format, 'tx')
    assert.instanceOf(shifter.src, Tx)
  })

  it('handles valid rawtx in buffer format', () => {
    const shifter = new Shapeshifter(Buffer.from(ttx.rawtx, 'hex'))
    assert.equal(shifter.format, 'tx')
    assert.instanceOf(shifter.src, Tx)
  })

  it('throws error when given invalid hex', () => {
    assert.throws(_ => {
      new Shapeshifter('8813a685c9fb0c07020411fcf4f990d1c7dff602')
    }, 'The source tx is not a valid Bitcoin transaction.')
  })

  it('throws error when given invalid buffer', () => {
    assert.throws(_ => {
      new Shapeshifter(Buffer.from([0, 4, 5, 112, 222, 232, 11]))
    }, 'The source tx is not a valid Bitcoin transaction.')
  })

  it('handles BSV.Transaction struct', () => {
    const shifter = new Shapeshifter(ttx.tx, 'hex')
    assert.equal(shifter.format, 'tx')
    assert.deepEqual(shifter.src, ttx.tx)
  })

  it('handles valid TXO object', () => {
    const shifter = new Shapeshifter(ttx.txo)
    assert.equal(shifter.format, 'txo')
    assert.deepEqual(shifter.src, ttx.txo)
  })

  it('handles valid BOB object', () => {
    const shifter = new Shapeshifter(ttx.bob)
    assert.equal(shifter.format, 'bob')
    assert.deepEqual(shifter.src, ttx.bob)
  })

  it('throws error when given invalid object', () => {
    assert.throws(_ => {
      new Shapeshifter({})
    }, 'The source tx is not a valid Bitcoin transaction.')
  })
})


describe('Shapeshifter.toBuffer()', () => {
  it('handles rawtx to buffer', () => {
    assert.deepEqual(Shapeshifter.toBuffer(ttx.rawtx), Buffer.from(ttx.rawtx, 'hex'))
  })

  it('converts Tx object to buffer', () => {
    assert.deepEqual(Shapeshifter.toBuffer(ttx.tx), Buffer.from(ttx.rawtx, 'hex'))
  })

  it('converts TXO object to buffer', () => {
    assert.deepEqual(Shapeshifter.toBuffer(ttx.txo), Buffer.from(ttx.rawtx, 'hex'))
  })

  it('converts BOB object to buffer', () => {
    assert.deepEqual(Shapeshifter.toBuffer(ttx.bob), Buffer.from(ttx.rawtx, 'hex'))
  })

  it('throws error when given src tx', () => {
    assert.throws(_ => {
      Shapeshifter.toBuffer({})
    }, 'The source tx is not a valid Bitcoin transaction.')
  })
})


describe('Shapeshifter.toHex()', () => {
  it('handles rawtx to buffer', () => {
    assert.equal(Shapeshifter.toHex(ttx.rawtx), ttx.rawtx)
  })

  it('converts Tx object to buffer', () => {
    assert.equal(Shapeshifter.toHex(ttx.tx), ttx.rawtx)
  })

  it('converts TXO object to buffer', () => {
    assert.equal(Shapeshifter.toHex(ttx.txo), ttx.rawtx)
  })

  it('converts BOB object to buffer', () => {
    assert.equal(Shapeshifter.toHex(ttx.bob), ttx.rawtx)
  })

  it('throws error when given src tx', () => {
    assert.throws(_ => {
      Shapeshifter.toHex({})
    }, 'The source tx is not a valid Bitcoin transaction.')
  })
})


describe('Shapeshifter.toTx()', () => {
  it('converts rawtx to Tx object', () => {
    assert.deepEqual(Shapeshifter.toTx(ttx.rawtx), ttx.tx)
  })

  it('handles Tx object to Tx object', () => {
    assert.deepEqual(Shapeshifter.toTx(ttx.tx), ttx.tx)
  })

  it('converts TXO object to Tx object', () => {
    assert.deepEqual(Shapeshifter.toTx(ttx.txo), ttx.tx)
  })

  it('converts BOB object to Tx object', () => {
    assert.deepEqual(Shapeshifter.toTx(ttx.bob), ttx.tx)
  })

  it('throws error when given src tx', () => {
    assert.throws(_ => {
      Shapeshifter.toTx({})
    }, 'The source tx is not a valid Bitcoin transaction.')
  })
})


describe('Shapeshifter.toTxo()', () => {
  it('converts rawtx to TXO object', () => {
    const res = Shapeshifter.toTxo(ttx.rawtx)
    assert.deepEqual(res.tx, ttx.txo.tx)
    assert.lengthOf(res.in, ttx.txo.in.length)
    assert.lengthOf(res.out, ttx.txo.out.length)
    assert.equal(res.in[0].e.a, ttx.txo.in[0].e.a)
    assert.equal(res.out[0].e.a, ttx.txo.out[0].e.a)
  })

  it('converts Tx object to TXO object', () => {
    const res = Shapeshifter.toTxo(ttx.tx)
    assert.deepEqual(res.tx, ttx.txo.tx)
    assert.lengthOf(res.in, ttx.txo.in.length)
    assert.lengthOf(res.out, ttx.txo.out.length)
    assert.equal(res.in[0].e.a, ttx.txo.in[0].e.a)
    assert.equal(res.out[0].e.a, ttx.txo.out[0].e.a)
  })

  it('handles TXO object to TXO object', () => {
    const res = Shapeshifter.toTxo(ttx.txo)
    assert.deepEqual(res, ttx.txo)
  })

  it('converts BOB object to TXO object', () => {
    const res = Shapeshifter.toTxo(ttx.bob)
    const test = { ...ttx.txo }
    delete test._id
    assert.deepEqual(res, test)
  })

  it('throws error when given src tx', () => {
    assert.throws(_ => {
      Shapeshifter.toTxo({})
    }, 'The source tx is not a valid Bitcoin transaction.')
  })
})


describe('Shapeshifter.toBob()', () => {
  it('converts rawtx to BOB object', () => {
    const res = Shapeshifter.toBob(ttx.rawtx)
    assert.deepEqual(res.tx, ttx.bob.tx)
    assert.lengthOf(res.in, ttx.bob.in.length)
    assert.lengthOf(res.out, ttx.bob.out.length)
    assert.equal(res.in[0].e.a, ttx.bob.in[0].e.a)
    assert.equal(res.out[0].e.a, ttx.bob.out[0].e.a)
  })

  it('converts Tx object to BOB object', () => {
    const res = Shapeshifter.toBob(ttx.tx)
    assert.deepEqual(res.tx, ttx.bob.tx)
    assert.lengthOf(res.in, ttx.bob.in.length)
    assert.lengthOf(res.out, ttx.bob.out.length)
    assert.equal(res.in[0].e.a, ttx.bob.in[0].e.a)
    assert.equal(res.out[0].e.a, ttx.bob.out[0].e.a)
  })

  it('converts TXO object to BOB object', () => {
    const res = Shapeshifter.toBob(ttx.txo)
    const test = { ...ttx.bob }
    delete test._id
    assert.deepEqual(res, test)
  })

  it('handles BOB object to BOB object', () => {
    const res = Shapeshifter.toBob(ttx.bob)
    assert.deepEqual(res.out, ttx.bob.out)
  })

  it('throws error when given src tx', () => {
    assert.throws(_ => {
      Shapeshifter.toBob({})
    }, 'The source tx is not a valid Bitcoin transaction.')
  })

  it('currectly indexes piped cells from tx', () => {
    let res = Shapeshifter.toBob(ttxp.tx)
    assert.deepEqual(res.out[0].tape[0], ttxp.bob.out[0].tape[0])
    assert.deepEqual(res.out[0].tape[1], ttxp.bob.out[0].tape[1])
    assert.deepEqual(res.out[0].tape[2], ttxp.bob.out[0].tape[2])
    assert.deepEqual(res.out[0].tape[3], ttxp.bob.out[0].tape[3])
  })

  it('currectly indexes piped cells from txo', () => {
    let res = Shapeshifter.toBob(ttxp.txo)
    assert.deepEqual(res.out[0].tape[0], ttxp.bob.out[0].tape[0])
    assert.deepEqual(res.out[0].tape[1], ttxp.bob.out[0].tape[1])
    assert.deepEqual(res.out[0].tape[2], ttxp.bob.out[0].tape[2])
    assert.deepEqual(res.out[0].tape[3], ttxp.bob.out[0].tape[3])
  })
})