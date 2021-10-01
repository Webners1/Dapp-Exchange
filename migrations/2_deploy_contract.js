const Swap = artifacts.require("Swap");
const Token = artifacts.require("Token");
module.exports = async function (deployer) {

       await deployer.deploy(Token);
       const token = await Token.deployed()
       await deployer.deploy(Swap,token.address);
       const swap = await Swap.deployed()
       await token.transfer(swap.address,1000000)
};
