// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'
import "dotenv/config";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying by...', deployer.address)

    // Define parameters for the OFTWithFee contract
    const name = process.env.NAME?process.env.NAME:"";
    const symbol = process.env.SYMBOL?process.env.SYMBOL:"";
    
    const sharedDecimals = 8; 
    const lzEndpoint = process.env.LZ_ENDPOINT_BASE?process.env.LZ_ENDPOINT_BASE:""; // LayerZero endpoint 

    // Deploy the OFTWithFee contract
    const OFTWithFee = await ethers.getContractFactory('OFTWithFee');
    const oftWithFeeContract = await OFTWithFee.deploy(name, symbol, sharedDecimals, lzEndpoint);

    // Waiting for the contract deployment to be confirmed on the blockchain.
    await oftWithFeeContract.waitForDeployment();

    // Logging the address of the deployed OFTWithFee contract.
    console.log(`OFTWithFee contract is deployed to Base blockchain. Address: ${oftWithFeeContract.target}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})