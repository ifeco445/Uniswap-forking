require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 2000,
        },
      }
    },
    ]
  },
  networks: {
hardhat: {
  forking: {
    url: "",
       blockNumber: 14189520
  }
},

  },
};
