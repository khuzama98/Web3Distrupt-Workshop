// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// library to convert uint256 to string
import "@openzeppelin/contracts/utils/Strings.sol"; 

import { ERC721 } from "./ERC721.sol";

contract NFT is ERC721 {
    using Strings for uint256;

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 private _currentTokenId = 0; // the current NFT ID tracker
    string private _baseURI = "ipfshash/";

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
    * @dev Mints a new NFT to address `to`
    * @notice This is not a production ready function as anyone can mint an nft
    * Only for demo purposes
    */
    function mint(address _to) external {
        _currentTokenId = _currentTokenId + 1;

        _safeMint(_to, _currentTokenId);
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
        if (bytes(_baseURI).length > 0) {
            // ipfshash/tokenId. e.g. ipfshash/1
            return string(
                // Performs packed encoding of the given arguments
                abi.encodePacked(
                    _baseURI, tokenId.toString()
                )
            );
        }

        return "";
    }
}
