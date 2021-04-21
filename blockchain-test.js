const Blockchain = require('./blockchain');
const Block = require('./block');
var expect = require('chai').expect;

describe('Blockchain', () => {
    console.log("test");
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('Adds genesis block', () => {
        expect(bc.chain[0].toString()).to.equal(Block.genesis().toString());
    });
    it('Adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).to.equal(data);
    });
    it('Validates a valid chain', () => {
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).to.be.true;
    });

    it('Invalidates a chain with corrupt block', () => {
        bc2.chain[0].data = 'Bad data';
        expect(bc.isValidChain(bc2.chain)).to.be.false;
    });
    
});
