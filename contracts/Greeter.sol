//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting; // private data field only accessible to functions inside this contract; unable to see data in outside world

    constructor(string memory _greeting) { // contructor where data can be initialed. Set in the deploy.js script
        console.log("Deploying a Greeter with greeting:\n", _greeting);
        greeting = _greeting;
    }

    // called in App.js when a user clicks on the fetch greeting button
    function greet() public view returns (string memory) { // public means it can be read from react app and view means it is read only
        return greeting;
    }

    // called in App.js and changes the string to the newly user inputted value
    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    // removes warnings
    fallback() external payable{

    }

    receive() external payable{

    }
}
