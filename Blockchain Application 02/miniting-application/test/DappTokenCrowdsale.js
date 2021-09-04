import ether from './helpers/ether';
import EVMRevert from './helpers/EVMRevert';

const { assert } = require('chai');
const BigNumber = web3.BigNumber;

const DappToken = artifacts.require("./DappToken.sol");
const DappTokenCrowdsale = artifacts.require("./DappTokenCrowdsale.sol");


require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()

contract('DappTokenCrowdsale', ([_, wallet, investor1, investor2]) => {    //these corresponds to the first 3 acs in ganache

    beforeEach(async function () {

        //deploy token 
        this.token = await DappToken.new("M2 TOKEN", "M2C", 18);   
        
        //crwodsale configuration
        this.rate = 500;  //500 tokens per 1 ETH
        this.wallet = wallet;
        this.cap = ether(100);  //set cap on the amount to be raised
        this.investorMinCap = ether(0.002);
        this.investorHardCap = ether(50);

        this.crowdsale = await DappTokenCrowdsale.new(this.rate, this.wallet, this.token.address, this.cap);
        
        //transfer ownership to the crowdsale (cannot mint without the ownership)
        await this.token.transferOwnership(this.crowdsale.address);
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

    describe("minted crowdsale", function () {
        it ('mints tokens after purchase', async function () {
            const originalTotalSupply = await this.token.totalSupply();
            await this.crowdsale.sendTransaction({ value: ether(1), from: investor1});
            const newTotalSupply = await this.token.totalSupply();
            assert.isTrue(newTotalSupply > originalTotalSupply);
        });
    });

    describe("capped crowdsale", function () {
        it ('has the correct hardcap', async function () {
            const cap = await this.crowdsale.cap();
            cap.should.be.bignumber.equal(this.cap);
        });
    });

    describe("accepting payments", function () {
        it ('accept payments', async function () {
            const value = ether(1);
            const purchaser = investor2;
            await this.crowdsale.sendTransaction({ value: value, from: investor1}).should.be.fulfilled;

            //buy tokens by purchaser, on behalf of investor1
            await this.crowdsale.buyTokens(investor1, { value: value, from: purchaser}).should.be.fulfilled;
        });
    });

    describe("buy tokens", function () {

        describe ('contribution is less than min cap', async function () {
            it ('rejects the transaction', async function() {
                const value = this.investorMinCap - 1;
                await this.crowdsale.buyTokens(investor2, { value: value, from: investor2}).should.be.rejectedWith(EVMRevert); 
            });     
        });

        describe ('contribution is more than than min cap', async function () {
            it ('accepts the transaction', async function() {
                const value1 = ether(0.5);
                await this.crowdsale.buyTokens(investor2, { value: value1, from: investor2}).should.be.fulfilled;
                
                // now this should be accpeted as the investor2 has already invested more than the min cap
                const value2 = ether(0.0001); //wei
                await this.crowdsale.buyTokens(investor2, { value: value2, from: investor2}).should.be.fulfilled;
            });     
        });

        describe ('contribution is more than than max cap', async function () {
            it ('rejects the transaction', async function() {
                const value1 = ether(2);
                await this.crowdsale.buyTokens(investor2, { value: value1, from: investor2});
                
                // now this should be rejected
                const value2 = ether(4); //wei
                await this.crowdsale.buyTokens(investor2, { value: value2, from: investor2}).should.be.rejectedWith(EVMRevert);
            });     
        });

        describe ('contribution is within the range', async function () {
            it ('transaction succeeds & updates the contribution mapping', async function() {
                const value = ether(2);
                await this.crowdsale.buyTokens(investor2, { value: value, from: investor2}).should.be.fulfilled;
                const contribution = await this.crowdsale.getUserContribution(investor2);
                contribution.should.be.bignumber.equal(value);
            });     
        });

    });

});