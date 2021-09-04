pragma solidity >=0.4.23;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract DappTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale {

    constructor (uint256 _rate, address _walllet, ERC20 _token, uint256 _cap) 
        Crowdsale(_rate, _walllet, _token)
        CappedCrowdsale(_cap)
        public 
    {

    }
}