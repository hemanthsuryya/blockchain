const Transaction = require('./transaction');
const Wallet = require('./index');
var expect = require('chai').expect;

describe('Transaction', () =>{
    let transaction, wallet, recipient, amount;

    beforeEach(()=> {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('Outputs the amount subtracted from the wallet balance', ()=> {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).to.equal(wallet.balance-amount);

    });

    it('Outputs the amount added to the recipient', ()=>{
        expect(transaction.outputs.find(output => output.address === recipient).amount).to.equal(amount);
    });

    it('Inputs the balance of the wallet', ()=> {
        expect(transaction.input.amount).to.equal(wallet.balance);
    });

    it('Validates a valid tx ', ()=>{
        expect(Transaction.verifyTransaction(transaction)).to.equal(true);
    });

    it('Invalidates a corrupt transaction', () => {
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).to.equal(false);
    });

    describe('and updating a tx', ()=>{
        let nextAmount, nextRecipient;
    
        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'n3xt-4ddr3ss';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });
    
        it("Subtracts the next amount from the sender's output", ()=>{
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).to.equal(wallet.balance - amount - nextAmount);
            console.log('Updated TX 1');
            console.log(transaction);
        });
    
        it(`Outputs an amount for the next recipient`, ()=>{
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount).to.equal(nextAmount);
            console.log('Updated TX 2');
            console.log(transaction);
        })
    
    });
});

