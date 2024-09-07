// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'
import "dotenv/config";

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying by...',  deployer.address)
    
    const TokenAddress = process.env.TOKEN_ADDRESS?process.env.TOKEN_ADDRESS:"";
    console.log('===== TokenAddress', TokenAddress)

    const instanceBridge = await ethers.getContractFactory('ProxyOFTWithFee');
    const lzEndpoint = process.env.LZ_ENDPOINT_ETH?process.env.LZ_ENDPOINT_ETH:""; // LayerZero endpoint 
    console.log('===== lzEndpoint', lzEndpoint)

    const BridgeContract = await instanceBridge.deploy(TokenAddress, 8, lzEndpoint); 

    // Waiting for the contract deployment to be confirmed on the blockchain.
    await BridgeContract.waitForDeployment()

    // Logging the address of the deployed My404 contract.
    console.log(`Bridge contract is deployed to Ethereum blockchain. Token address: ${BridgeContract.target}`)
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})