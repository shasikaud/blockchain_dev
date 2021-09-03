import ether from './helpers/ether';

const { assert } = require('chai');
const BigNumber = web3.BigNumber;

const DappToken = artifacts.require("./DappToken.sol");
const DappTokenCrowdsale = artifacts.require("./DappTokenCrowdsale.sol");


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DappTokenCrowdsale', ([_, wallet, investor1, investor2]) => {    //these corresponds to the first 3 acs in ganache

    beforeEach(async function () {

        //deploy token 
        this.token = await DappToken.new("M2 TOKEN", "M2C", 18);   
        
        //crwodsale configuration
        this.rate = 500;  //500 tokens per 1 ETH
        this.wallet = wallet;
        this.crowdsale = await DappTokenCrowdsale.new(this.rate, this.wallet, this.token.address);
    });


    describe("crowdsale deployment", function () {
        it ('tracks the token', async function () {
            const token = await this.crowdsale.token()
            //token.should.equal(this.token.address)
            assert.equal(token, this.token.address)
        });

        it ('tracks the rate', async function () {
            const rate = await this.crowdsale.rate()
            //rate.should.be.a.bignumber.equal(this.rate);
            assert.equal(rate, this.rate)
        });
    });

    describe("accepting payments", function () {
        it ('accept payments', async function () {
            const value = ether(1);
            await this.crowdsale.sendTransaction({ value: value, from: investor1})
        });

    });


});