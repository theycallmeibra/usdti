// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlashUSDT {
    // Token Metadata
    string public name = "Flash USDT";
    string public symbol = "USDTI";
    uint8 public decimals = 6;

    // Total Supply
    uint256 public totalSupply = 1000000000 * (10 ** decimals);

    // Mapping of addresses to balances
    mapping(address => uint256) public balanceOf;

    // Mapping of addresses to allowed spenders
    mapping(address => mapping(address => uint256)) public allowance;

    // Event emitted when tokens are transferred
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Event emitted when allowance is updated
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Constructor
    constructor()  {
        balanceOf[0x55d398326f99059fF775485246999027B3197955] = totalSupply;
    }

    // Function to transfer tokens
    function transfer(address to, uint256 value) public returns (bool) {
        require(to != address(0));
        require(value <= balanceOf[msg.sender]);

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    function mint(address to, uint256 amount) public  {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
    // Function to approve spender
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    // Function to transfer tokens from one address to another
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(to != address(0));
        require(value <= balanceOf[from]);
        require(value <= allowance[from][msg.sender]);

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}