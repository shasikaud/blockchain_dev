// 2021-08-13 02:00 AM (UTC
pragma solidity ^0.8.2;

contract MultiSigWallet {
    
    event Deposit(address indexed sender, uint amount, uint balance);
    
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
        );
        
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);
    
    
    /**
    state variables
    */
    
    address[] public owners; //array to store the owners 
    mapping(address => bool) public isOwner;   //whether address corresponds to a unique owner 
    uint public numConfirmationsRequired;
    
    struct Transaction {
        address to;   //address to be sent to
        uint value;  //amount of ether to be sent
        bytes data;  //incase of calling another contract, data of that contract 
        bool executed;  //whether the contract is executed or not 
        mapping (address => bool) isConfirmed;   //whether the multi sig holders have confirmed or not
        uint numConfirmations;
    }
    
    Transaction[] public transactions;
    
    /***/
    
    constructor(address[] memory _owners, uint _numConfirmationsRequired) public {
        require(_owners.length > 0, "Owners required");
        require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "Invalid number of required confirmations");
        
        //initializing the owners
        for (uint i=0; i<_owners.length; i++){
            address owner = _owner[i];
            require(owner != address(0), "Invalid Owner");
            require(!isOwner[owner], "Owner not unique");
            isOwner[owner] = true;
            owners.push(owner);
        }
        
        numConfirmationsRequired = _numConfirmationsRequired;
        
    }
    
    modifier onlyOwner() {
        require (isOwner[msg.sender], "Not Owner");
        _;
    }
    
    function submitTransaction(address _to, uint _value, bytes memory _data) public onlyOwner {
        uint txIndex = transactions.length; //transactions counter
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));
        
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
        
    }
    
    modifier txExists(uint _txIndex){
        require (_txIndex < transactions.length, "Tx does not exists");
        _;
    }
    
     modifier notExecuted(uint _txIndex){
        require (!transactions[_txIndex].executed, "Tx already executed");
        _;
    }
    
     modifier notConfirmed(uint _txIndex){
        require (!transactions[_txIndex].isConfirmed[msg.sender], "Tx already confirmed);
        _;
    }
    
    function confirmTransaction(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) notConfirmed(_txIndex) {
        Transaction storage transaction = transactions[_txIndex]; //retrieve and store the transaction in var transaction locally
        transaction.isConfirmed[msg.sender] = true;
        transaction.numConfirmations += 1;
        
        emit ConfirmTransaction(msg.sender, _txIndex);
    }
    
    function executeTransaction() {}
    
    function revokeConfirmation() {}
    
}