pragma solidity >=0.4.23;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";

contract DappTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale {

    //Minimum investor contribution -> 0.002 Ether
    //Maximum investor contribution -> 5 Ether
    uint256 public investorMinCap = 2000000000000000; // 0.002 ether
    uint256 public investorHardCap = 5000000000000000000; // 5 ether
    mapping(address => uint256) public contributions;

    constructor (
        uint256 _rate, 
        address _walllet, 
        ERC20 _token, 
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime
        ) 
        Crowdsale(_rate, _walllet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        public 
    {

    }

    function getUserContribution (address _beneficiary) public view returns (uint256)
    {
        return contributions[_beneficiary];
    }

    //internal override function
    function _preValidatePurchase (address _beneficiary, uint256 _weiAmount) internal
    {
        super._preValidatePurchase(_beneficiary, _weiAmount);  //crowdsale func
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investorHardCap);
        contributions[_beneficiary] = _newContribution;
    }

}