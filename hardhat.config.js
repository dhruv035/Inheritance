require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  etherscan:{
    apiKey:process.env.ETHERSCAN_KEY
  },
  networks:[
    {
      goerli:{
        url:process.env.GOERLI_URL,
        accounts:[process.env.PRIVATE_KEY]
      }
    }
  ]
};
