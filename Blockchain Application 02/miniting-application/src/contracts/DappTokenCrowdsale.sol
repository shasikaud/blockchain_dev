pragma solidity >=0.4.23;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract DappTokenCrowdsale is Crowdsale, MintedCrowdsale {

    constructor (uint256 _rate, address _walllet, ERC20 _token) 
        Crowdsale(_rate, _walllet, _token)
        public 
    {

    }
}