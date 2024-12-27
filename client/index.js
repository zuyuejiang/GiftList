const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // prove to the server we're on the nice list? 
  const name = 'Norman Block';
  const index = niceList.findIndex(n => n === name);
  const merkleTree = new MerkleTree(niceList); 
  const proof = merkleTree.getProof(index); 
  // console.log(proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // request body parameters
    name,
    proof
  });

  console.log({ gift });
}

main();