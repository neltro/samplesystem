const { v4: uuidv4 } = require('uuid');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

module.exports.getTransactions = async (accountno) => {
    const transactions = await Transaction.find({ accountNo: accountno });
    if (transactions){
        const list = transactions.map(tran => {
            return {
                tranNo: tran.tranNo,
                tranDate: tran.tranDate,
                action: tran.action,
                description: tran.description,
                amount: tran.amount,
                currency: tran.currency
            }
        })
        return {
            success: true,
            data: list
        }
    } else {
        return {
            success: false,
            data: {
                msg: 'No transaction found.'
            }
        }
    }
}

module.exports.addTransaction = async (transaction) => {
    try {
        const { accountNo, toAccountNo, description, amount, currency } = transaction;
        if (accountNo && toAccountNo && description && amount && currency){
            const resultUpdated = await updateAccounts(accountNo, toAccountNo, amount);
            if (resultUpdated.success){
                const debitTransaction = new Transaction({
                    tranNo: uuidv4(),
                    tranDate: new Date,
                    accountNo,
                    action: 'Debit',
                    description,
                    amount,
                    currency
                });
                await debitTransaction.save();
                const creditTransaction = new Transaction({
                    tranNo: uuidv4(),
                    tranDate: new Date,
                    accountNo: toAccountNo,
                    action: 'Credit',
                    description,
                    amount,
                    currency
                });
                await creditTransaction.save();
                return {
                    success: true,
                    data: {
                        msg: 'Successfully inserted transactions and updated accounts.'
                    }
                }
            } else {
                return resultUpdated;
            }
        } else {
            return {
                success: false,
                data: {
                    msg: 'There is error with data format.'
                }
            }
        }
    } catch (err){
        return {
            success: false,
            data: {
                msg: 'Server error.'
            }
        }
    }
}

checkBalance = (balance, amount) => {
    if (balance < amount){
        return {
            success: false,
            data: {
                msg: `Rejected: remaining balance is ${balance}.`,
                param: 'amount',
                field: 'amount'
            }
        };
    }
    return { success: true }
}

updateAccounts = async (accountNo, toAccountNo, amount) => {
    const fromAccount = await Account.findOne({ accountNo: accountNo });
    const toAccount = await Account.findOne({ accountNo: toAccountNo });
    if (fromAccount && toAccount){
        const resultCheckBalance = checkBalance(fromAccount.balance, amount);
        if (!resultCheckBalance.success){
            return resultCheckBalance;
        }
        const updateAmount = parseInt(amount);
        fromAccount.balance -= isNaN(updateAmount) ? 0 : updateAmount;
        await fromAccount.save();
        toAccount.balance += isNaN(updateAmount) ? 0 : updateAmount;
        await toAccount.save();
        return {
            success: true
        }
    } else {
        return {
            success: false,
            msg: `Account No. ${accountNo} not found.`
        }
    }
}