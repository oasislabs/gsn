require('ts-node/register/transpile-only')

const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = 'digital unknown jealous mother legal hedgehog save glory december universe spread figure custom found six'

const secretMnemonicFile = './secret_mnemonic'
const fs = require('fs')
let secretMnemonic
if (fs.existsSync(secretMnemonicFile)) {
  secretMnemonic = fs.readFileSync(secretMnemonicFile, { encoding: 'utf8' })
}

module.exports = {
  networks: {

    development: {
      provider: undefined,
      verbose: process.env.VERBOSE,
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    // coverage: { // coverage/trace provider. note that it currently can't run extrnal-process relay.
    //   provider: require('./coverage-prov.js'),
    //   verbose: process.env.VERBOSE,
    //   network_id: '*'
    // },
    npmtest: { // used from "npm test". see package.json
      verbose: process.env.VERBOSE,
      host: '127.0.0.1',
      port: 8544,
      network_id: '*'
    },
    mainnet: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/v3/f40be2b1a3914db682491dc62a19ad43')
      },
      network_id: 1
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/f40be2b1a3914db682491dc62a19ad43')
      },
      network_id: 42
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/f40be2b1a3914db682491dc62a19ad43')
      },
      network_id: 4
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/f40be2b1a3914db682491dc62a19ad43')
      },
      network_id: 3
    },
    xdai_poa_mainnet: {
      provider: function () {
        return new HDWalletProvider(secretMnemonic, 'https://dai.poa.network')
      },
      network_id: 100
    },
    tbnb: {
      provider: function () {
        return new HDWalletProvider(secretMnemonic, 'https://data-seed-prebsc-1-s1.binance.org:8545')
      },
      network_id: 0x61
    },
    bnb: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://bsc-dataseed.binance.org/')
      },
      network_id: 0x38
    },
    kotti: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://kotti.connect.bloq.cloud/v1/roast-blossom-sentence')
      },
      network_id: '6'
    },
    arbitrum_rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.arbitrum.io/rpc')
      },
      network_id: '421611'
    }
  },
  mocha: {
    slow: 1000
  },
  compilers: {
    solc: {
      version: '0.7.6',
      settings: {
        evmVersion: 'istanbul',
        optimizer: {
          enabled: true,
          runs: 200 // Optimize for how many times you intend to run the code
        }
      }
    }
  }
}
