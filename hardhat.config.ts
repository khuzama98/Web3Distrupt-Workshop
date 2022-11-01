import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: "./.env" });

const mnemonic: string | undefined = process.env.MNEMONIC;
const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;

const etherscanApiKey: string = process.env.ETHERSCAN_API_KEY || "";
const polygonscanApiKey: string = process.env.POLYGONSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      goerli: etherscanApiKey,
      sepolia: etherscanApiKey,
      polygonMumbai: polygonscanApiKey,
    },
  },
  networks: {
    goerli: {
      accounts: {
        count: 10,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
      chainId: 5,
      url: `https://goerli.infura.io/v3/${infuraApiKey}`,
    },
    sepolia: {
      accounts: {
        count: 10,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${infuraApiKey}`,
    },
    "polygon-mumbai": {
      accounts: {
        count: 10,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
      chainId: 80001,
      url: "https://matic-mumbai.chainstacklabs.com",
    },
  },
  solidity: "0.8.9",
};

export default config;
