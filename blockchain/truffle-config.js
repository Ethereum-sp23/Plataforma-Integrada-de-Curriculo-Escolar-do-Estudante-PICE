require('dotenv').config();
const { MNEMONIC, INFURA_API_KEY, ETHERSCAN_API_KEY } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    myKey: ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: "11155111",
      gas: 4465030,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20",
    }
  },
};
