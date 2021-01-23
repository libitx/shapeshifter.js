import { Tx } from 'bsv'

export const rawtx = '01000000017204013d163fc39792efbdc5076cd3cfaad1506fdf5d3ecea1860a27bc563dc5020000006b483045022100ffd2dd45bae522a1da278cb5986fdcbd32f7c8329e8c42d4aca28d3df4bd3a1f022038654460717cd7aa707aabf1375af4a214ffe1a3af65373b8e955701c95543ea412102ea6551ff7a5ed6bb288bddb7000fc6d1b3ab9e9184686bee5dd3ffb070453ccdffffffff020000000000000000fd2901006a2231394878696756345179427633744870515663554551797131707a5a56646f4175741a5468697320697320746865207365636f6e6420706f73742e0a0a0d746578742f6d61726b646f776e055554462d38017c223150755161374b36324d694b43747373534c4b79316b683536575755374d745552350353455403617070055f74657374047479706504706f7374017c22313550636948473232534e4c514a584d6f53556157566937575371633768436676610d424954434f494e5f4543445341223150587065584b63375458726f66506d35706144577a694c6a7663434450766a6e59411fb7de097024306c7d03bc2e6b5c0bfcb92b9eba8504006df1037a3473bdc305cd091072914a5d40c2f56e509ab843fe4f6f4a2bd5e5e9f4f867f1b654fce7a07003cd0100000000001976a914edba41da2b471fc615f5957de3aaf1e5a61495ce88ac00000000'

export const tx = Tx.fromHex(rawtx)

export const txo = {
  "_id": "600b5f770ae6bf99232e048b",
  "tx": {
    "h": "9b49cac261149bc27627a3c3041587f38a6127bb02048b2227f6b9b3d7cc75ec"
  },
  "in": [
    {
      "i": 0,
      "seq": 4294967295,
      "e": {
        "h": "c53d56bc270a86a1ce3e5ddf6f50d1aacfd36c07c5bdef9297c33f163d010472",
        "i": 2,
        "a": "14itvG4GnAJfqFdB2XMEsrcpBP8GkA45JN"
      },
      "len": 2,
      "s0": "0E\u0002!\u0000���E��\"��'���oܽ2��2��BԬ��=��:\u001f\u0002 8eD`q|תpz��7Z��\u0014�ᣯe7;��W\u0001�UC�A",
      "b0": "MEUCIQD/0t1FuuUiodonjLWYb9y9MvfIMp6MQtSsoo099L06HwIgOGVEYHF816pweqvxN1r0ohT/4aOvZTc7jpVXAclVQ+pB",
      "h0": "3045022100ffd2dd45bae522a1da278cb5986fdcbd32f7c8329e8c42d4aca28d3df4bd3a1f022038654460717cd7aa707aabf1375af4a214ffe1a3af65373b8e955701c95543ea41",
      "s1": "\u0002�eQ�z^ֻ(�ݷ\u0000\u000f�ѳ����hk�]���pE<�",
      "b1": "AuplUf96Xta7KIvdtwAPxtGzq56RhGhr7l3T/7BwRTzN",
      "h1": "02ea6551ff7a5ed6bb288bddb7000fc6d1b3ab9e9184686bee5dd3ffb070453ccd"
    }
  ],
  "out": [
    {
      "i": 0,
      "e": {
        "v": 0,
        "i": 0,
        "a": "false"
      },
      "len": 18,
      "o0": "OP_0",
      "o1": "OP_RETURN",
      "s2": "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
      "b2": "MTlIeGlnVjRReUJ2M3RIcFFWY1VFUXlxMXB6WlZkb0F1dA==",
      "h2": "31394878696756345179427633744870515663554551797131707a5a56646f417574",
      "s3": "This is the second post.\n\n",
      "b3": "VGhpcyBpcyB0aGUgc2Vjb25kIHBvc3QuCgo=",
      "h3": "5468697320697320746865207365636f6e6420706f73742e0a0a",
      "s4": "text/markdown",
      "b4": "dGV4dC9tYXJrZG93bg==",
      "h4": "746578742f6d61726b646f776e",
      "s5": "UTF-8",
      "b5": "VVRGLTg=",
      "h5": "5554462d38",
      "s6": "|",
      "b6": "fA==",
      "h6": "7c",
      "s7": "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
      "b7": "MVB1UWE3SzYyTWlLQ3Rzc1NMS3kxa2g1NldXVTdNdFVSNQ==",
      "h7": "3150755161374b36324d694b43747373534c4b79316b683536575755374d74555235",
      "s8": "SET",
      "b8": "U0VU",
      "h8": "534554",
      "s9": "app",
      "b9": "YXBw",
      "h9": "617070",
      "s10": "_test",
      "b10": "X3Rlc3Q=",
      "h10": "5f74657374",
      "s11": "type",
      "b11": "dHlwZQ==",
      "h11": "74797065",
      "s12": "post",
      "b12": "cG9zdA==",
      "h12": "706f7374",
      "s13": "|",
      "b13": "fA==",
      "h13": "7c",
      "s14": "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva",
      "b14": "MTVQY2lIRzIyU05MUUpYTW9TVWFXVmk3V1NxYzdoQ2Z2YQ==",
      "h14": "313550636948473232534e4c514a584d6f5355615756693757537163376843667661",
      "s15": "BITCOIN_ECDSA",
      "b15": "QklUQ09JTl9FQ0RTQQ==",
      "h15": "424954434f494e5f4543445341",
      "s16": "1PXpeXKc7TXrofPm5paDWziLjvcCDPvjnY",
      "b16": "MVBYcGVYS2M3VFhyb2ZQbTVwYURXemlManZjQ0RQdmpuWQ==",
      "h16": "3150587065584b63375458726f66506d35706144577a694c6a7663434450766a6e59",
      "s17": "\u001f��\tp$0l}\u0003�.k\\\u000b��+���\u0004\u0000m�\u0003z4s��\u0005�\t\u0010r�J]@��nP��C�OoJ+�����g�T��p",
      "b17": "H7feCXAkMGx9A7wua1wL/LkrnrqFBABt8QN6NHO9wwXNCRBykUpdQML1blCauEP+T29KK9Xl6fT4Z/G2VPznoHA=",
      "h17": "1fb7de097024306c7d03bc2e6b5c0bfcb92b9eba8504006df1037a3473bdc305cd091072914a5d40c2f56e509ab843fe4f6f4a2bd5e5e9f4f867f1b654fce7a070"
    },
    {
      "i": 1,
      "e": {
        "v": 118019,
        "i": 1,
        "a": "1NfzGqvAtXG77UpmEgaNb5F1nyfoujf4Ng"
      },
      "len": 5,
      "o0": "OP_DUP",
      "o1": "OP_HASH160",
      "s2": "��A�+G\u001f�\u0015��}���\u0014��",
      "b2": "7bpB2itHH8YV9ZV946rx5aYUlc4=",
      "h2": "edba41da2b471fc615f5957de3aaf1e5a61495ce",
      "o3": "OP_EQUALVERIFY",
      "o4": "OP_CHECKSIG"
    }
  ],
  "lock": 0,
  "i": 753,
  "blk": {
    "i": 671168,
    "h": "000000000000000005675e51db9624f22cf5d2bf45d20287d2cae5c016f85d5c",
    "t": 1611358060
  }
}

export const bob = {
  "_id": "600b5f7776ccf5bcea1c6e4f",
  "tx": {
    "h": "9b49cac261149bc27627a3c3041587f38a6127bb02048b2227f6b9b3d7cc75ec"
  },
  "in": [
    {
      "i": 0,
      "seq": 4294967295,
      "tape": [
        {
          "cell": [
            {
              "s": "0E\u0002!\u0000���E��\"��'���oܽ2��2��BԬ��=��:\u001f\u0002 8eD`q|תpz��7Z��\u0014�ᣯe7;��W\u0001�UC�A",
              "h": "3045022100ffd2dd45bae522a1da278cb5986fdcbd32f7c8329e8c42d4aca28d3df4bd3a1f022038654460717cd7aa707aabf1375af4a214ffe1a3af65373b8e955701c95543ea41",
              "b": "MEUCIQD/0t1FuuUiodonjLWYb9y9MvfIMp6MQtSsoo099L06HwIgOGVEYHF816pweqvxN1r0ohT/4aOvZTc7jpVXAclVQ+pB",
              "i": 0,
              "ii": 0
            },
            {
              "s": "\u0002�eQ�z^ֻ(�ݷ\u0000\u000f�ѳ����hk�]���pE<�",
              "h": "02ea6551ff7a5ed6bb288bddb7000fc6d1b3ab9e9184686bee5dd3ffb070453ccd",
              "b": "AuplUf96Xta7KIvdtwAPxtGzq56RhGhr7l3T/7BwRTzN",
              "i": 1,
              "ii": 1
            }
          ],
          "i": 0
        }
      ],
      "e": {
        "h": "c53d56bc270a86a1ce3e5ddf6f50d1aacfd36c07c5bdef9297c33f163d010472",
        "i": 2,
        "a": "14itvG4GnAJfqFdB2XMEsrcpBP8GkA45JN"
      }
    }
  ],
  "out": [
    {
      "i": 0,
      "tape": [
        {
          "cell": [
            {
              "op": 0,
              "ops": "OP_0",
              "i": 0,
              "ii": 0
            },
            {
              "op": 106,
              "ops": "OP_RETURN",
              "i": 1,
              "ii": 1
            }
          ],
          "i": 0
        },
        {
          "cell": [
            {
              "s": "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
              "h": "31394878696756345179427633744870515663554551797131707a5a56646f417574",
              "b": "MTlIeGlnVjRReUJ2M3RIcFFWY1VFUXlxMXB6WlZkb0F1dA==",
              "i": 0,
              "ii": 2
            },
            {
              "s": "This is the second post.\n\n",
              "h": "5468697320697320746865207365636f6e6420706f73742e0a0a",
              "b": "VGhpcyBpcyB0aGUgc2Vjb25kIHBvc3QuCgo=",
              "i": 1,
              "ii": 3
            },
            {
              "s": "text/markdown",
              "h": "746578742f6d61726b646f776e",
              "b": "dGV4dC9tYXJrZG93bg==",
              "i": 2,
              "ii": 4
            },
            {
              "s": "UTF-8",
              "h": "5554462d38",
              "b": "VVRGLTg=",
              "i": 3,
              "ii": 5
            }
          ],
          "i": 1
        },
        {
          "cell": [
            {
              "s": "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5",
              "h": "3150755161374b36324d694b43747373534c4b79316b683536575755374d74555235",
              "b": "MVB1UWE3SzYyTWlLQ3Rzc1NMS3kxa2g1NldXVTdNdFVSNQ==",
              "i": 0,
              "ii": 7
            },
            {
              "s": "SET",
              "h": "534554",
              "b": "U0VU",
              "i": 1,
              "ii": 8
            },
            {
              "s": "app",
              "h": "617070",
              "b": "YXBw",
              "i": 2,
              "ii": 9
            },
            {
              "s": "_test",
              "h": "5f74657374",
              "b": "X3Rlc3Q=",
              "i": 3,
              "ii": 10
            },
            {
              "s": "type",
              "h": "74797065",
              "b": "dHlwZQ==",
              "i": 4,
              "ii": 11
            },
            {
              "s": "post",
              "h": "706f7374",
              "b": "cG9zdA==",
              "i": 5,
              "ii": 12
            }
          ],
          "i": 2
        },
        {
          "cell": [
            {
              "s": "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva",
              "h": "313550636948473232534e4c514a584d6f5355615756693757537163376843667661",
              "b": "MTVQY2lIRzIyU05MUUpYTW9TVWFXVmk3V1NxYzdoQ2Z2YQ==",
              "i": 0,
              "ii": 14
            },
            {
              "s": "BITCOIN_ECDSA",
              "h": "424954434f494e5f4543445341",
              "b": "QklUQ09JTl9FQ0RTQQ==",
              "i": 1,
              "ii": 15
            },
            {
              "s": "1PXpeXKc7TXrofPm5paDWziLjvcCDPvjnY",
              "h": "3150587065584b63375458726f66506d35706144577a694c6a7663434450766a6e59",
              "b": "MVBYcGVYS2M3VFhyb2ZQbTVwYURXemlManZjQ0RQdmpuWQ==",
              "i": 2,
              "ii": 16
            },
            {
              "s": "\u001f��\tp$0l}\u0003�.k\\\u000b��+���\u0004\u0000m�\u0003z4s��\u0005�\t\u0010r�J]@��nP��C�OoJ+�����g�T��p",
              "h": "1fb7de097024306c7d03bc2e6b5c0bfcb92b9eba8504006df1037a3473bdc305cd091072914a5d40c2f56e509ab843fe4f6f4a2bd5e5e9f4f867f1b654fce7a070",
              "b": "H7feCXAkMGx9A7wua1wL/LkrnrqFBABt8QN6NHO9wwXNCRBykUpdQML1blCauEP+T29KK9Xl6fT4Z/G2VPznoHA=",
              "i": 3,
              "ii": 17
            }
          ],
          "i": 3
        }
      ],
      "e": {
        "v": 0,
        "i": 0,
        "a": "false"
      }
    },
    {
      "i": 1,
      "tape": [
        {
          "cell": [
            {
              "op": 118,
              "ops": "OP_DUP",
              "i": 0,
              "ii": 0
            },
            {
              "op": 169,
              "ops": "OP_HASH160",
              "i": 1,
              "ii": 1
            },
            {
              "s": "��A�+G\u001f�\u0015��}���\u0014��",
              "h": "edba41da2b471fc615f5957de3aaf1e5a61495ce",
              "b": "7bpB2itHH8YV9ZV946rx5aYUlc4=",
              "i": 2,
              "ii": 2
            },
            {
              "op": 136,
              "ops": "OP_EQUALVERIFY",
              "i": 3,
              "ii": 3
            },
            {
              "op": 172,
              "ops": "OP_CHECKSIG",
              "i": 4,
              "ii": 4
            }
          ],
          "i": 0
        }
      ],
      "e": {
        "v": 118019,
        "i": 1,
        "a": "1NfzGqvAtXG77UpmEgaNb5F1nyfoujf4Ng"
      }
    }
  ],
  "lock": 0,
  "i": 753,
  "blk": {
    "i": 671168,
    "h": "000000000000000005675e51db9624f22cf5d2bf45d20287d2cae5c016f85d5c",
    "t": 1611358060
  }
}