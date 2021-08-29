const { assert } = require('chai');

const SocialNetwork = artifacts.require("./SocialNetwork.sol");


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SocialNetwork', ([deployer, author, tipper]) => {    //these corresponds to the first 3 acs in ganache
    let socialNetwork

    before(async () => {
        socialNetwork = await SocialNetwork.deployed()
    })

    describe("deployment", async () => {
        it ('deploys successfully', async () => {
            const address = await socialNetwork.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it ('has a name', async () => {
            const name = await socialNetwork.name()
            assert.equal(name, 'Dapp University Social Network')
        })

    })

    describe('posts', async () => {

        let result, postCount;

        before (async () => {
            result = await socialNetwork.createPost("This is my first test post", {from:author})
            postCount = await socialNetwork.postCount()
        })

        it ('creates posts', async () => {
            
            assert.equal(postCount, 1)
            //console.log(result)

            const event = result.logs[0].args    //results contains the events emitted
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'POST ID IS CORRECT')
            assert.equal(event.content, "This is my first test post", 'POST CONTENT IS CORRECT')
            assert.equal(event.tipAmount, '0', 'TIP AMOUNT IS CORRECT')
            assert.equal(event.author, author, 'AUTHOR IS CORRECT')
            //console.log(event.tipper)

            //FAILED CONTENTS
            await socialNetwork.createPost("", {from:author}).should.be.rejected;
        })

        it ('lists posts', async () => {
            const post = await socialNetwork.posts(postCount)     //posts -> mapping holding the posts
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'POST ID IS CORRECT')
            assert.equal(post.content, "This is my first test post", 'POST CONTENT IS CORRECT')
            assert.equal(post.tipAmount, '0', 'TIP AMOUNT IS CORRECT')
            assert.equal(post.author, author, 'AUTHOR IS CORRECT')

        })

        it ('allows users to tip posts', async () => {

        })
        
    })
})