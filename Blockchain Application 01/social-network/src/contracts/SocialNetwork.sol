pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;
    
    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address payable author;   //add payable modifier here
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
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

    function tipPost(uint _id) public payable {   //add payable modifier so that users can send ether

        //require -> _id < postCount
        require(_id > 0 && _id <= postCount);
        //fetch the post
        Post memory _post = posts[_id];   //modify it here and hav to reassign inorder to update the blockchain
        //fetch the owner
        address payable _author = _post.author;   //add payable modifier to the address also
        //pay the author
        address(_author).transfer(msg.value);  //sending ether to the author   
        //increament the tipamount
        _post.tipAmount = _post.tipAmount + msg.value;   //msg.value contains the ether amount sent by the user
        //update the post
        posts[_id] = _post;     //reassign
        //trigger event
        emit PostTipped(_id, '', msg.value, _author); //trigger event
    }

}