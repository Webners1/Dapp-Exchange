const { assert } = require('chai');

const { default: Web3 } = require("web3");

const Token = artifacts.require("Token");
const Swap = artifacts.require("Swap");

require('chai')
.use(require('chai-as-promised'))
.should()

const tokens = (n) => {
       return web3.utils.toWei(n, "ether");
};
contract('Swap',([deployer,investor])=>{
       let token,swap;
       before(async()=>{
              token = await Token.new();
              swap = await Swap.new(token.address)
              await token.transfer(swap.address, tokens('1000000'))

       })
       describe("Swap Token Deployment", async () => {
              it('contract has a name', async () => {
                     const name = await swap.name()
                     assert.equal(name, 'Swap Exchange')
              })
       })
       describe("Dapp Token Deployment", async () => {
              it('contract has a name', async () => {
                     const name = await token.name()
                     assert.equal(name, 'MuzammilDAPP')
              })
       it('contract has token',async()=>{        
              let balance = await token.balanceOf(swap.address);
              assert.equal(balance.toString(), tokens('1000000'))
       })
})
describe('buyToken()',async()=>{
       let result
       before(async () => {
              result = await swap.buyToken({ from: investor, value: web3.utils.toWei('1', 'ether') })


       })
it("allows user to from swap at a price",async()=>{
       let investorBalance = (await token.balanceOf(investor)).toString()
       assert.equal(investorBalance,tokens('100'))
       let swapBalance = await token.balanceOf(swap.address)
       assert.equal(swapBalance.toString(),tokens('999900'))
       const event = result.logs[0].args
       assert.equal(event.account, investor)
       assert.equal(event.token, token.address)
       assert.equal(event.amount.toString(), tokens('100').toString())
       assert.equal(event.rate.toString(), '100')
})
})
       describe('sellToken()', async () => {
              require(token.balanceOf(msg.sender)>= _amount);
              let result
              before(async () => {
                     await token.approve(swap.address, tokens('100'), { from: investor })
                     result = await swap.sellToken(tokens('100'), { from: investor })
              })
              it('Allow user to sell token to Swap at price', async()=>{
                     let investorBalance = (await token.balanceOf(investor)).toString()
                     assert.equal(investorBalance, tokens('0'))

                     let ethswapBalance
                     ethswapBalance = (await token.balanceOf(swap.address)).toString()
                     assert.equal(ethswapBalance, tokens('1000000'))
  
                     ethswapBalance =(await web3.eth.getBalance(swap.address)).toString()
                     assert.equal(ethswapBalance, web3.utils.toWei('0','Ether'))

                     const event = result.logs[0].args
                     assert.equal(event.account, investor)
                     assert.equal(event.token, token.address)
                     assert.equal(event.amount.toString(), tokens('100').toString())
                     assert.equal(event.rate.toString(), '100')
                     await swap.sellToken(tokens('500'),{from:investor}).should.be.rejected;
              })
             
       })
})