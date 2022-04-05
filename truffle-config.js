require('babel-register')

const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

// const mnemonic = [process.env.MNEMONIC];

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*', // Match any network id
    },
    // kovan: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       privateKeys.split(","), // Array of account private keys
    //       https://kovan.infura.io/v3/${process.env.INFURA_API_KEY} // Url to an Ethereum Node
    //     );
    //   },
    //   gas: 5000000,
    //   gasPrice: 5000000000, // 5 gwei
    //   network_id: 42,
    // },
    // main: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       privateKeys.split(","), // Array of account private keys
    //       https://main.infura.io/v3/${process.env.INFURA_API_KEY} // Url to an Ethereum Node
    //     );
    //   },
    //   gas: 5000000,
    //   gasPrice: 5000000000, // 5 gwei
    //   network_id: 1,
    // },
    // rinkeby: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       privateKeys.split(","), // Array of account private keys
    //       https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY} // Url to an Ethereum Node
    //     );
    //   },
    //   gas: 5000000,
    //   gasPrice: 5000000000, // 5 gwei
    //   network_id: 4,
    // },
    // ropsten: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       privateKeys.split(","), // Array of account private keys
    //       https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY} // Url to an Ethereum Node
    //     );
    //   },
    //   gas: 5000000,
    //   gasPrice: 5000000000, // 5 gwei
    //   network_id: 3,
    // },
    ewc: {
      provider: function () {
        return new HDWalletProvider(
          [process.env.MNEMONIC], // Array of account private keys
          'https://rpc.energyweb.org',
        )
      },
      gas: 8000000,
      gasPrice: 21000000, // 5 gwei
      network_id: 246,
      networkCheckTimeout: 60000000,
      timeoutBlocks: 5000,
    },
    volta: {
      provider: function () {
        return new HDWalletProvider(
          [process.env.MNEMONIC], // Array of account private keys
          'https://volta-rpc.energyweb.org',
        )
      },
      gas: 8000000,
      gasPrice: 21000000, // 5 gwei
      network_id: 73799,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.6.12',
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
}
