// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { CoffeeMock } from "./Coffee_NFT.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract Coffee {
    struct Donate {
        uint256 tokensDonated;
        uint256 noOfDonations;
    }

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    IERC20 public token;
    CoffeeMock public nft;

    uint256 public priceOfCoffee;
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

    event Withdrawal(uint256 tokenAmount, uint256 when);
    event Deposit(uint256 amount, address sender);
    event SetPriceOfCoffee(uint256 prevPriceOfCoffee, uint256 newPriceOfCoffee);

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        uint256 _priceOfCoffee,
        address _erc20,
        address _erc721
    ) {
        priceOfCoffee = _priceOfCoffee;
        token = IERC20(_erc20);
        nft = CoffeeMock(_erc721);
        owner = payable(msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                            EFFECT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /** 
     * @notice User can call this function to donate a coffee to owner
     * @dev User must have tokens to donate.
    */
    function donate(uint256 _num) external noReentrant returns (bool) {
        require(_num > 0, "Revert: bro donate 1 coffee atleast!");

        // loading state variable in memory for gas optimization
        uint256 _priceOfCoffee = priceOfCoffee;

        // multiply number of coffees to donate by price of coffee
        // to get total donation
        uint256 _donation = _priceOfCoffee * _num; 

        uint256 _tokenBalance = token.balanceOf(msg.sender);
        require(_tokenBalance > _donation, "Revert: bro you're broke as well!");

        // updating state
        _donations[msg.sender].tokensDonated += _donation;
        _donations[msg.sender].noOfDonations += 1;

        // approval must be given from msg.sender to this contract address before
        // transfers tokens from msg.sender to this contract
        token.transferFrom(msg.sender, address(this), _donation);

        for (uint256 i; i < _num; i++) {
            // mint nft to msg.sender
            nft.mintTo(msg.sender);
        }

        emit Deposit(_donation, msg.sender);

        return true;
    }

    /** 
     * @notice Owner can withdraw tokens in the contract
     * @dev Only callable by owner
    */
    function withdraw() external onlyOwner returns (bool) {
        uint256 _balance = token.balanceOf(address(this));
        require(_balance > 0, "Revert: No tokens in contract!");

        // transfer tokens in the contract to owner
        token.transfer(owner, _balance);

        emit Withdrawal(_balance, block.timestamp);

        return true;
    }

    /** 
     * @notice Owner can set price of coffee
     * @dev Only callable by owner
    */
    function setPriceOfCoffee(uint256 _priceOfCoffee) external onlyOwner {
        emit SetPriceOfCoffee(priceOfCoffee, _priceOfCoffee);
        priceOfCoffee = _priceOfCoffee;
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW/PURE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /** 
     * @notice Returns info of `_user`
    */
    function getUserDetails(address _user)
        external
        view
        returns (
            uint256,
            uint256
        )
    {
        return (
            _donations[_user].tokensDonated,
            _donations[_user].noOfDonations
        );
    }
}
