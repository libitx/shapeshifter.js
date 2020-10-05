# Shapeshifter.js

![Shapeshifter lets you quickly and simply switch between Bitcoin transaction formats](https://github.com/libitx/shapeshifter.js/raw/master/docs/poster.jpg)

![npm](https://img.shields.io/npm/v/@libitx/shapeshifter.js?color=informational)
![License](https://img.shields.io/github/license/libitx/shapeshifter.js?color=informational)
![Build Status](https://img.shields.io/github/workflow/status/libitx/shapeshifter.js/Node.js%20CI)

Shapeshifter.js is a JavaScript library for switching between Bitcoin transaction formats. Quickly and simply shift between raw tx formats, structured BSV Tx objects, and `TXO` and `BOB` serialization formats.

## Installation

Install Shapeshifter with npm or yarn:

```shell
npm install shapeshifter.js
# or
yarn add shapeshifter.js
```

Alternatively use in a browser via CDN:

```html
<script src="//unpkg.com/@libitx/shapeshifter.js/dist/shapeshifter.min.js"></script>
```

Shapeshifter has a peer dependency on version 2 the bsv library which must also be installed in your project.


## Usage

Using Shapeshifter.js couldn't be simpler. Under the hood Shapeshifter automatically determines the source format, so all you need to do is pass a transaction object of any format to the appropriate function of the format you want to convert to (from: `toHex()`, `toBuffer()`, `toTx()`, `toTxo()` or `toBob()`).

```javascript
// Convert to raw hex
Shapeshifter.toHex(tx)
// => "01000000..."

// Convert to raw Buffer
Shapeshifter.toBuffer(tx)
// => <Buffer 01 00 00 00 ...>

// Convert to structured BSV Tx object
Shapeshifter.toTx(tx)
// => Tx { versionBytesNum: 1, txIns: [...], txOuts: [...], ... }

// Convert to TXO map
Shapeshifter.toTxo(tx)
// => {in: [...], out: [...], ...}

// Convert to BOB map
Shapeshifter.toBob(tx)
// => {in: [...], out: [...], ...}
```

Shapeshifter.js can also be used to convert individual inputs and outputs between the supported formats.

To see Shapeshifter in action, try the [live demo](https://libitx.github.io/shapeshifter.js).

## Gotcha - watch those `"f"` attributes

The modern [Bitbus](https://bitbus.network) and [Bitsocket](https://bitsocket.network) services return an `"f"` attribute in both BOB and TXO schemas where the script chunk is in [excess of 512 bytes](https://docs.bitbus.network/#/?id=_5-working-with-large-data). If converting between BOB and TXO the `"f"` is kept in place, but if converting back to raw or a BSV `TxIn` instance, the `"f"` attribute is ignored, meaning you will not get the same transaction.

If you wish to convert a BOB or TXO object which contains `"f"` attributes back to a raw transaction, you must first fetch the referenced data from [BitFS](https://bitfs.network) and attach it to the same cell or indexed attribute as a `"b"` or `"h"` attribute.

Example:

```javascript
// Src object
{
  "f4": "ed661719089cab4be7dbeea527ffe40238d7d714e1dce5db2e2d75c8c2d1fd68.o.1.4",
  ...
}

// Must be converted to
{
  "b4": "TXkgZGVhciBXb3Jtd29vZCwgCgpJdCB3YXJtcyBteSBoZWFydCB0aGF0IHlvdSBo...",
  ...
}
```

## License

Shapeshifter.js is open source and released under the [Apache-2 License](https://github.com/libitx/shapeshifter.js/blob/master/LICENSE).

© Copyright 2020 libitx.
