const { response } = require('express');
const express       = require('express');
const Blockchain    = require('../blockchain/');
const P2pServer     = require('./p2p-server');

const bodyParser = require('body-parser');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app   = express();
app.use(bodyParser.json());
const bc    = new Blockchain();
const p2pServer = new P2pServer(bc);

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

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();