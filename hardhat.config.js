require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

let account = process.env.PRIVATE_KEY;
let api = process.env.API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
    },
    bsc: {
      url: "https://rpc-bsc.bnb48.club",
      accounts: [account]
    },
    bscTest: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      accounts: [account]
    }
  },
  etherscan: {
    apiKey: {
      bsc: api,
      bscTestnet: api,
    }
  }
};
