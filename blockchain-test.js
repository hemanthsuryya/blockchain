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
    it('Chain replacement with valid one', () => {
        bc2.addBlock('goo');
        // console.log(`${bc2.chain}`.toString());
        // console.log(`${bc.chain}`.toString());
        bc.replaceChain(bc2.chain);
        // console.log(`${bc.chain}`.toString());
        expect(bc.chain).to.equal(bc2.chain);
        
    });
    it(`Chain replacement doesnt happen if new chain length is less than or equal to length`, () => {
        bc.addBlock('foo-bar');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).to.not.equal(bc2.chain);
    });

});
