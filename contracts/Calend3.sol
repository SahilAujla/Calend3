// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calend3 {
    uint8 rate;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function getRate() public view returns (uint8) {
        return rate;
    }

    function setRate(uint8 _rate) public {
        require(msg.sender == owner, "Only the owner can set the rate");
        rate = _rate;
    }
}
