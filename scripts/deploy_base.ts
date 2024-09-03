// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying by...', deployer.address)

    // Define parameters for the OFTWithFee contract
    const name = "Bromer";
    const symbol = "BROM";
    // const name = "WoofWork.io";
    // const symbol = "WOOF";
    const sharedDecimals = 8; 
    // const lzEndpoint = "0x6EDCE65403992e310A62460808c4b910D972f10f";    // LayerZero endpoint for Base testnet
    const lzEndpoint = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7"; // LayerZero endpoint for Base prod (lz v1)
    // const lzEndpoint = "0x1a44076050125825900e736c501f859c50fE728c"; // LayerZero endpoint for Base prod (lz v2)

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