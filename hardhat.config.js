require("@nomiclabs/hardhat-waffle");
const { types } = require("hardhat/config");

const address = "0x3c77065b584d4af705b3e38cc35d336b081e4948";
const abi = require("./abi");

extendEnvironment(hre => {
  hre.init = async () => {
    global.contract = contract;
  };
});

task("generate")
  .addParam("id", "id of the nft", undefined, types.number)
  .setAction(async ({ id }, hre) => {
    const { ethers } = hre;

    const contract = new ethers.Contract(address, abi, ethers.provider);

    const uri = await contract.tokenURI(id);

    console.log(uri);
  });

task("generate-all").setAction(async (_, hre) => {
  const { ethers } = hre;

  const contract = new ethers.Contract(address, abi, ethers.provider);

  const uris = []
  for (let id = 0; id < 576; id++) {
    console.error(id)
    const uri = await contract.tokenURI(id);

    uris.push({
      id,
      uri
    })
  }

  console.log(JSON.stringify(uris, null, 2));
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    mainnet: {
      url: process.env.MAINNET_RPC_URL
    }
  }
};
