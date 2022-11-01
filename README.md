# Blockchain Genesis - Web3Disrupt Workshop

[![Open in Gitpod][gitpod-badge]][gitpod] [![Hardhat][hardhat-badge]][hardhat]

[gitpod]: https://gitpod.io/#https://github.com/khuzama98/Web3Distrupt-Workshop
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg

## Buy Me A Coffee ☕

This project demonstrates a basic smart contract usage. The project is designed to give basic concepts of smart contracts to the participants of Web3Disrupt.

This smart contract consist of following components:

1. Coffee Smart Contract.
2. Coffee ERC-20 Token.
3. Coffee ERC-721 Token.

## Functionalities

The smart contract consist of following functions,

1. Donate tokens worth a coffee to the owner.
2. Minting an NFT to the donar address.
3. Set price of the coffee.
4. Withdraw amount from the smart contract to owner account.

## Usage

### Setting up

```sh
# Clone repo
git clone https://github.com/khuzama98/Web3Distrupt-Workshop

# Install development dependencies
npm install
```

### Pre Requisites

Before running any command, you need to create a `.env` file and set all necessary environment
variables. Follow the example in `.env.example`.

If you don't already have a mnemonic, use this [bip39](https://iancoleman.io/bip39/) to
generate one.

If you don't already have an infura key, use this [infura](https://infura.io/) to generate one.

### Commands

Try running some of the following tasks:

```sh
# Get help screen
npx hardhat help

# Run to compile contracts
npx hardhat compile

# Run to generate typechain types
npx hardhat typechain

# Run hardhat tests
npx hardhat test

# Run hardhat tests with gas report
GAS_REPORT=true npx hardhat test

# Run a local hardhat network
npx hardhat node

# Run script to deploy contracts locally
npx hardhat run scripts/deploy.ts

# Run script to deploy contracts to a network specified in `hardhat.config.ts`
npx hardhat run scripts/deploy.ts --network goerli

# Run to clean artifacts, cache etc
npm run clean
```

## Disclaimer

These contracts are `NOT` production ready and are `ONLY` for demo and educational purposes.
