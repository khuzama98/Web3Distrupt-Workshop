// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Coffee_NFT.sol";

contract Coffee {
    IERC20 token;
    CoffeeMock NFT;
    uint256 public price;
    address payable public owner;
    bool private locked;

    struct Donate {
        uint256 _token;
        uint256 _ethAmount;
        uint16 _noOfDonations;
    }

    mapping(address => Donate) donations;

    modifier onlyOwner() {
        require(msg.sender == owner, "Revert: not an owner");
        _;
    }

    modifier noReentrant() {
        require(!locked, "Revert: no re-entrancy bro!");
        locked = true;
        _;
        locked = false;
    }

    event Withdrawal(uint256 tokenAmount, uint256 etherAmount, uint256 when);
    event Deposit(uint256 amount, address sender);

    constructor(
        uint256 _price,
        address _erc20,
        address _erc721
    ) {
        price = _price;
        token = IERC20(_erc20);
        NFT = CoffeeMock(_erc721);
        owner = payable(msg.sender);
        locked = false;
    }

    receive() external payable {
        require(msg.sender != address(0), "Revert: come from original ID bro!");
        donations[msg.sender]._ethAmount += msg.value;
        donations[msg.sender]._noOfDonations += 1;
        emit Deposit(msg.value, msg.sender);
    }

    function setPrice(uint256 _price) external onlyOwner returns (uint256) {
        price = _price;
        return price;
    }

    function donate(uint256 _num) external noReentrant returns (bool) {
        require(_num > 0, "Revert: bro donate 1 coffee atleast!");
        require(msg.sender != address(0), "Revert: come from original ID bro!");
        uint256 _price = price; // loading state variable in memory for gas optimizzation
        uint256 donationPrice = _price * _num; //for simplicity we're assuming 1 token = 1 usd

        uint256 balance = token.balanceOf(msg.sender);
        require(balance > donationPrice, "Revert: bro you're broke as well!");
        donations[msg.sender]._token += donationPrice;
        donations[msg.sender]._noOfDonations += 1;
        token.transferFrom(msg.sender, address(this), donationPrice);
        if (donations[msg.sender]._noOfDonations == 1) {
            NFT.mintTo(msg.sender);
        }

        return true;
    }

    function withdrawAmount() external onlyOwner returns (bool) {
        uint256 balance = token.balanceOf(msg.sender);
        assert(balance > 0);
        token.transferFrom(address(this), owner, balance);
        owner.transfer(address(this).balance);
        emit Withdrawal(balance, address(this).balance, block.timestamp);
        return true;
    }

    function getUserDetails()
        external
        view
        returns (
            uint256,
            uint256,
            uint16
        )
    {
        return (
            donations[msg.sender]._token,
            donations[msg.sender]._ethAmount,
            donations[msg.sender]._noOfDonations
        );
    }
}
