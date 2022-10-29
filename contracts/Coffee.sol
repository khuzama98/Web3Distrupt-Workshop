// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { CoffeeMock } from "./Coffee_NFT.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract Coffee {
    struct Donate {
        uint256 token;
        uint256 ethAmount;
        uint256 noOfDonations;
    }

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    IERC20 public token;
    CoffeeMock public nft;

    uint256 public price;
    address payable public owner;

    bool private _locked;

    mapping(address => Donate) private _donations;

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Revert: not an owner");
        _;
    }

    modifier noReentrant() {
        require(!_locked, "Revert: no re-entrancy bro!");
        _locked = true;
        _;
        _locked = false;
    }

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Withdrawal(uint256 tokenAmount, uint256 etherAmount, uint256 when);
    event Deposit(uint256 amount, address sender);

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        uint256 _price,
        address _erc20,
        address _erc721
    ) {
        price = _price;
        token = IERC20(_erc20);
        nft = CoffeeMock(_erc721);
        owner = payable(msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                        NON-VIEW/PURE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    receive() external payable {
        _donations[msg.sender].ethAmount += msg.value;
        _donations[msg.sender].noOfDonations += 1;

        nft.mintTo(msg.sender);

        emit Deposit(msg.value, msg.sender);
    }

    function donate(uint256 _num) external noReentrant returns (bool) {
        require(_num > 0, "Revert: bro donate 1 coffee atleast!");

        // loading state variable in memory for gas optimizzation
        uint256 _price = price;

        // for simplicity we're assuming 1 token = 1 usd
        uint256 _donationPrice = _price * _num; 

        uint256 _balance = token.balanceOf(msg.sender);
        require(_balance > _donationPrice, "Revert: bro you're broke as well!");

        // updating state
        _donations[msg.sender].token += _donationPrice;
        _donations[msg.sender].noOfDonations += 1;

        // aproval must be given from msg.sender to this contract address before
        // transfers tokens from msg.sender to this contract
        token.transferFrom(msg.sender, address(this), _donationPrice);

        nft.mintTo(msg.sender);

        return true;
    }

    function withdrawAmount() external onlyOwner returns (bool) {
        uint256 _balance = token.balanceOf(msg.sender);
        require(_balance > 0, "Revert: No tokens in contract!");

        // transfer tokens in the contract to owner
        token.transferFrom(address(this), owner, _balance);

        // transfer ether in the contract to owner
        owner.transfer(address(this).balance);

        emit Withdrawal(_balance, address(this).balance, block.timestamp);

        return true;
    }

    function setPrice(uint256 _price) external onlyOwner returns (uint256) {
        price = _price;
        return price;
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW/PURE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getUserDetails()
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            _donations[msg.sender].token,
            _donations[msg.sender].ethAmount,
            _donations[msg.sender].noOfDonations
        );
    }
}
