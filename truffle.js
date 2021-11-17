require('babel-register')
require('babel-polyfill')
const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    fantom: {
      provider: function () {
        return new HDWalletProvider("60a92cf4f8e8a9487d720c2622bfead3cd09c881ff460b713ee0f5dfdb58d856", "https://rpc.testnet.fantom.network/", 0, 2);
      },
      network_id: 4002,
      gasPrice: 1500000000,
      gas: 8000000,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://ropsten.infura.io/v3/${process.env.ROPSTEN_INFURA_API_KEY}`
        )
      },
      network_id: '3',
    },
  },
  compilers: {
    solc: {
      version: '0.4.25'    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
