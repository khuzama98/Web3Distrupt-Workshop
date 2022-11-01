// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract CoffeeMock is ERC721 {
    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 private _currentTokenId = 0; // the current NFT ID tracker

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name,_symbol) {}

    /*//////////////////////////////////////////////////////////////
                            EFFECT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev Mints a new Coffee NFT to address `to`
    * @notice This is not a production ready function as anyone can mint an nft
    * Only for demo purposes
    */
    function mintTo(address _to) external {
        uint256 _newID = _getNextID();
        _incrementIDInState();
        _safeMint(_to, _newID);
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW/PURE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Returns the current token id
     * @return uint256 for the current token ID
     */
    function currentTokenId() external view returns (uint256) {
        return _currentTokenId;
    }

    /**
     * @inheritdoc ERC721
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        super.tokenURI(tokenId);

        return "";
    }

    /*//////////////////////////////////////////////////////////////
                            PRIVATE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Increments the value of _currentTokenId
     */
    function _incrementIDInState() private {
        _currentTokenId++;
    }

    /**
     * @dev Calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextID() private view returns (uint256) {
        return _currentTokenId + 1;
    }
}
