pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;
    
    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address author
    );

    constructor() public {
        name = "Dapp University Social Network";
    } 

    function createPost(string memory _content) public {
        //requirements
        require(bytes(_content).length > 0);

        postCount ++;  //increament the post count
        posts[postCount] = Post(postCount, _content, 0, msg.sender);   //create the post
        emit PostCreated(postCount, _content, 0, msg.sender); //trigger event
    }

    function tipPost()

}