// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract CoffeeMock is ERC721 {
    uint256 private _currentTokenId = 0; // shows the current NFT ID

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name,_symbol) {}

    /**
    * @dev mints a new Coffee NFT to address `to`
    */
    function mintTo(address _to) external {
        uint256 _newID = _getNextID();
        _incrementIDInState();
        _safeMint(_to, _newID);
    }

    /**
     * @dev returns the current token id
     * @return uint256 for the current token ID
     */
    function currentTokenId() external view returns (uint256) {
        return _currentTokenId;
    }

    /**
     * @dev calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextID() private view returns (uint256) {
        return _currentTokenId + 1;
    }

    /**
     * @dev increments the value of _currentTokenId
     */
    function _incrementIDInState() private {
        _currentTokenId++;
    }
}
