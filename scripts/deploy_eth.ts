// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
    // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
    const [deployer] = await ethers.getSigners()
    console.log('Contract is deploying by...',  deployer.address)
    // const instanceUSDC = await ethers.deployContract('MyToken');
    // await instanceUSDC.waitForDeployment();
    // const TokenAddress = await instanceUSDC.getAddress();
    // const TokenAddress = '0xa0C66feB9d0eee09f7DFCbEf8A6d46b22aFA8183'; // for tests
    const TokenAddress = '0xe3944AB788A60ca266f1eEc3C26925b95f6370aD'       // RAIN token
    // const TokenAddress = '0x6bc08509b36a98e829dffad49fde5e412645d0a3';    // for prod (WOOF)
    // console.log(`Token contract is deployed. Token address: ${instanceUSDC.target}`)

    const instanceBridge = await ethers.getContractFactory('ProxyOFTWithFee');
    // const lzEndpoint = '0x6EDCE65403992e310A62460808c4b910D972f10f';     // test
    const lzEndpoint = '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675';  // prod lz v1
    // const lzEndpoint = '0x1a44076050125825900e736c501f859c50fE728c';  // prod lz v2
    const BridgeContract = await instanceBridge.deploy(TokenAddress, 8, lzEndpoint); // _lzEndpoint holesky

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