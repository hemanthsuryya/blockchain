const { response } = require('express');
const express       = require('express');
const Blockchain    = require('../blockchain/');
const P2pServer     = require('./p2p-server');
const Wallet        = require('../wallet');
const bodyParser    = require('body-parser');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
// HTTP_PORT=3002 npm run dev
const app       = express();
app.use(bodyParser.json());
const bc        = new Blockchain();
const wallet    = new Wallet();
const tp        = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const data2 = req.body.data;
    const block = bc.addBlock(data2);
    // console.log(`New block added: ${block.toString()}<br>`);
    
    p2pServer.syncChains();
    
    res.redirect('/blocks');

});

app.get('/transactions', (req, res) => {
    res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);
    p2pServer.broadcastTransaction(transaction);
    res.redirect('/transactions');
});

app.get('/public-key', (req,res)=>{
    const publicKey = wallet.publicKey;
    // console.log(publicKey);
    res.json({Public_Key :publicKey});
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();