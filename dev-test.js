// Testing by adding 10 blocks
// const Blockchain = require('./blockchain/');
// const bc = new Blockchain();

// for(let i=0; i<10; i++){
//     console.log(bc.addBlock(`foo ${i}`).toString());
// }

//Testing wallet
const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());