// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        string memory _name,
        string memory _symbol
    ) 
        ERC20(_name, _symbol) 
    {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        uint8 _decimals = decimals();
        uint256 _typeCastedDecimals = uint256(_decimals);

        _mint(
            msg.sender, // account
            10_000 * 10 ** _typeCastedDecimals // amount e.g. 10_000 x 10^18
        );
    }

    /*//////////////////////////////////////////////////////////////
                            EFFECT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
    * @dev Mints a new MyToken tokens of amount `_amount` to address `_to`
    * @notice This is not a production ready function as anyone can mint tokens
    * Only for demo purposes
    */
    function mint(address _to, uint256 _amount) external {
        _mint(_to, _amount);
    }
}
