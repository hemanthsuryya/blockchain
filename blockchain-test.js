const Blockchain = require('./blockchain');
const Block = require('./block');
var expect = require('chai').expect;

describe('Blockchain', () => {
    console.log("test");
    let bc;

    beforeEach(() => {
        bc = new Blockchain();
    });

    it('Adds genesis block', () => {
        expect(bc.chain[0].toString()).to.equal(Block.genesis().toString());
    });
    it('Adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).to.equal(data);
    });
    
});
