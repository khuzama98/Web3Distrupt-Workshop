// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract CoffeeMock is ERC721 {
    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    // the current NFT ID tracker
    // be default value is 0
    uint256 private _currentTokenId; 

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    /*//////////////////////////////////////////////////////////////
                            EFFECT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev Mints a new Coffee NFT to address `to`
    * @notice This is not a production ready function as anyone can mint an nft
    * Only for demo purposes
    */
    function mintTo(address _to) external {
        // increment the token id
        _currentTokenId++;

        // get the incremented new token id
        uint256 _id = _currentTokenId;

        _safeMint(_to, _id);
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
        _requireMinted(tokenId);

        // https://{cid}.ipfs.nftstorage.link/
        return "ipfs://bafkreidtzux4ez453colsi2vafe6ylskwze5ybbcogjdtnasp6erdamota";
    }
}
