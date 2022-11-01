# Blockchain Genesis - Web3Disrupt Workshop

[![Open in Gitpod][gitpod-badge]][gitpod] [![Hardhat][hardhat-badge]][hardhat]

[gitpod]: https://gitpod.io/#https://github.com/khuzama98/Web3Distrupt-Workshop/tree/erc20
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg

## ERC20 Token

This project demonstrates a basic ERC20 smart contract usage. The project is designed to give basic concepts of smart contracts to the participants of Web3Disrupt.

Reference implementation of standard ERC20 according to [EIP-20](https://eips.ethereum.org/EIPS/eip-20)

## Usage

### Setting up

```sh
# Clone repo
git clone https://github.com/khuzama98/Web3Distrupt-Workshop

# Checkout branch
git checkout erc20

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
