const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const { expect } = require('chai');

describe('TransactionPool', () => {
    let tp, wallet, transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'r4nd-4ddr355', 30);
        tp.updateOrAddTransaction(transaction);
    });

    it('Adds a transaction to the pool', () =>{
        expect(tp.transactions.find(t => t.id === transaction.id)).to.equal(transaction);
    });

    it('Updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
        tp.updateOrAddTransaction(newTransaction);
        // console.log("Tx pool\n\n");
        // console.log(JSON.stringify(tp));
        // console.log("----xxxx----\n");
        expect(JSON.stringify(tp.transactions.find(t=>t.id === newTransaction.id))).not.equal(oldTransaction);
    });


})