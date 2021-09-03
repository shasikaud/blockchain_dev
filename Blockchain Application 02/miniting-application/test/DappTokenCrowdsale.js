const { assert } = require('chai');

const DappToken = artifacts.require("./DappToken.sol");
const DappTokenCrowdsale = artifacts.require("./DappTokenCrowdsale.sol");


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DappTokenCrowdsale', ([_, wallet]) => {    //these corresponds to the first 3 acs in ganache
    
    let dappToken
    let dappTokenCrowdsale

    beforeEach(async function () {

        //deploy token 
        dappToken = await DappToken.new("M2 TOKEN", "M2C", 18);   
        
        //crwodsale configuration
        this.rate = 500;  //500 tokens per 1 ETH
        this.wallet = wallet;
        this.address = await dappToken.address;
        dappTokenCrowdsale = await DappTokenCrowdsale.new(this.rate, this.wallet, this.address);
    })


    describe("deployment", async () => {
        it ('deploys successfully', async () => {
            // const address = await dappTokenCrowdsale.address
            // assert.notEqual(address, 0x0)
            // assert.notEqual(address, '')
            // assert.notEqual(address, null)
            // assert.notEqual(address, undefined)
        })

        // it ('intialisation is correct', async () => {
        //     const name = await dappTokenCrowdsale.name()
        //     assert.equal(name, 'Dapp Token')
        // })

    })


})