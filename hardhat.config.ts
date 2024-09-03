import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";

const privateKey = process.env.PRIVATE_KEY?process.env.PRIVATE_KEY:"";
const PROJECT_ID = process.env.PROJECT_ID?process.env.PROJECT_ID:"";
const etherscanKey = process.env.ETHERSCAN_API_KEY?process.env.ETHERSCAN_API_KEY:"";
const basescanKey = process.env.BASESCAN_API_KEY?process.env.BASESCAN_API_KEY:"";
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
  networks: {
    mainnet: {
      // url: `https://mainnet.infura.io/v3/${infuraKey}`,
      url: `https://eth-mainnet.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [privateKey],
    },
    base_mainnet: {
      // url: `https://base-mainnet.g.alchemy.com/v2/${PROJECT_ID}`,
      url: "https://mainnet.base.org",
      accounts: [privateKey],
    },
    base_sepolia:{
      url: "https://base-sepolia.blockpi.network/v1/rpc/public",
      // url: `https://base-sepolia.g.alchemy.com/v2/${PROJECT_ID}`,
      accounts: [privateKey],
    },
    holesky_testnet:{
      // url: "https://ethereum-holesky-rpc.publicnode.com",
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: [privateKey],
    },
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      // mainnet: "ED2NED96C214Y891MR98PZZ1Q45VTFYZRV",
      mainnet: etherscanKey,
      // basemainnet: "1SZX9N4CQNAX489BHPEW27C2FG5PPP4MB1",
      base: basescanKey,
      // baseSepolia: "1SZX9N4CQNAX489BHPEW27C2FG5PPP4MB1", // etherscan: ED2NED96C214Y891MR98PZZ1Q45VTFYZRV BSC: 1UME8V5UP4AZHYDF7RWC78GTIXXRPJHTQY Base: 1SZX9N4CQNAX489BHPEW27C2FG5PPP4MB1
      baseSepolia: basescanKey, 
      // holesky: "ED2NED96C214Y891MR98PZZ1Q45VTFYZRV",
      holesky: etherscanKey,
    },
  },
  gasReporter: {
    enabled: true,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;

