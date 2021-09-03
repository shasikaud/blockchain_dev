// ---- token deployment test cases -------

// const { assert } = require('chai');

// const DappToken = artifacts.require("./DappToken.sol");


// require('chai')
//     .use(require('chai-as-promised'))
//     .should()

// contract('DappToken', accounts => {    //these corresponds to the first 3 acs in ganache
//     let dappToken

//     before(async () => {
//         //dappToken = await DappToken.deployed()
//         dappToken = await DappToken.new("TOKEN","M2",18)
//     })


//     describe("deployment", async () => {
//         it ('deploys successfully', async () => {
//             const address = await dappToken.address
//             assert.notEqual(address, 0x0)
//             assert.notEqual(address, '')
//             assert.notEqual(address, null)
//             assert.notEqual(address, undefined)
//         })

//         it ('intialisation is correct', async () => {
//             const name = await dappToken.name()
//             assert.equal(name, 'Dapp Token')
//             const symbol = await dappToken.symbol()
//             assert.equal(symbol, 'DAPP')
//             const decimals = await dappToken.decimals()
//             assert.equal(decimals, 18)
//         })

//     })


// })