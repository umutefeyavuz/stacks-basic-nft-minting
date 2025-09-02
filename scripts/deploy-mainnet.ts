// Stacks mainnet deploy script (template)
// You can use @stacks/transactions and @stacks/network libraries for real deployment.

import { makeContractDeploy } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

async function deployContract() {
  // Prepare your private key and contract code
  const privateKey = "YOUR_MAINNET_PRIVATE_KEY";
  const contractName = "nft-contract";
  const contractCode = require('fs').readFileSync('./contracts/nft-contract.clar', 'utf8');

  const txOptions = {
    contractName,
    codeBody: contractCode,
    senderKey: privateKey,
    network: new StacksMainnet(),
  };

  const transaction = await makeContractDeploy(txOptions);
  // Broadcast transaction using your preferred method here
  console.log("Deploy tx:", transaction);
}

deployContract();