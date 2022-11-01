// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "./ERC20.sol";

contract MyToken is ERC20 {
    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {}

    /*//////////////////////////////////////////////////////////////
                            EFFECT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Mints a new tokens of amount `_amount` to address `_to`
     * @notice This is not a production ready function as anyone can mint tokens
     * Only for demo purposes
    */
    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }

    /**
     * @dev Burns tokens of amount `_amount` from address `_from`
     * @notice This is not a production ready function as anyone can burn tokens
     * Only for demo purposes
    */
    function burn(address _from, uint256 _amount) external {
        _burn(_from, _amount);
    }
}
