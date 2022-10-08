// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CoffeeMock is ERC721 {
    uint public _currentTokenId = 0; // shows the current NFT ID

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name,_symbol) {
    }

    function mintTo(address to) public {
        uint newID = getNextID();
        _safeMint(to, newID);
        incrementID();
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function getNextID() private view returns (uint) {
        return _currentTokenId+1;
    }

   /**
     * @dev increments the value of _currentTokenId
     */
    function incrementID() private {
        _currentTokenId++;
    }
}