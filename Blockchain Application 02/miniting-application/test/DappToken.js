const { assert } = require('chai');

const DappToken = artifacts.require("./DappToken.sol");


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DappToken', (accounts) => {    //these corresponds to the first 3 acs in ganache
    let dappToken

    before(async () => {
        dappToken = await DappToken.deployed()
    })

    describe("deployment", async () => {
        it ('deploys successfully', async () => {
            const address = await dappToken.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it ('has a name', async () => {
            const name = await dappToken.name()
            assert.equal(name, 'MINTING APPLICATION')
        })

    })


})