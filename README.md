# Shapeshifter.js

![Shapeshifter lets you quickly and simply switch between Bitcoin transaction formats](https://github.com/libitx/shapeshifter.js/raw/master/docs/poster.jpg)

![npm](https://img.shields.io/npm/v/shapeshifter.js?color=informational)
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
<script src="https://unpkg.com/shapeshifter.js/dist/shapeshifter.min.js"></script>
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

## License

Shapeshifter.js is open source and released under the [Apache-2 License](https://github.com/libitx/shapeshifter.js/blob/master/LICENSE).

© Copyright 2020 libitx.
