// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Will {
    
    address payable public heir;
    address payable public owner;
    uint256 lastAction;
    uint256 public Timeout = 30 days;

    constructor(address payable _heir) payable {
        heir = _heir;
        owner = payable(msg.sender);
        lastAction = block.timestamp;
    }

    modifier onlyOwner{
        require(msg.sender==owner);
        _;
    }


    modifier onlyHeir{
        require(msg.sender==heir);
        _;
    }

    function withdraw(uint256 amount) external onlyOwner{
       
       
       lastAction=block.timestamp; 
       if(amount>0)
        {
            require(address(this).balance>=amount);
            (bool sent, ) = owner.call{value: amount}("");
            require(sent, "Failed to send Ether");
        }
    }

    function takeControl(address payable _heir) external onlyHeir{
        require(block.timestamp>lastAction+Timeout);
        owner=heir;
        heir=_heir;
        lastAction = block.timestamp;
    }

    receive() external payable {}
}
