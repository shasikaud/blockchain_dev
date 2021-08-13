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
        
        for (uint i=0; i<_owners.length; i++){
            address owner = _owner[i];
            require(owner != address(0), "Invalid Owner");
        }
    }
    
    function submitTransaction() {}
    
    function confirmTransaction() {}
    
    function executeTransaction() {}
    
    function revokeConfirmation() {}
    
}