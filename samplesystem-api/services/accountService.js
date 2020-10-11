const Account = require('../models/Account');

module.exports.getAccount = async (accountNo) => {
    const account = await Account.findOne({ accountNo: accountNo });
    if (account){
        return {
            success: true,
            data: {
                accountNo: account.accountNo,
                name: account.name,
                balance: account.balance,
                currency: account.currency
            }
        }
    } else {
        return {
            success: false,
            data: {
                msg: 'Account not found'
            }
        }
    }
}

module.exports.checkbalance = async (accountNo) => {
    const account = await Account.findOne({ accountNo: accountNo });
    if (account){
        return {
            success: true,
            data: {
                balance: account.balance
            }
        }
    } else {
        return {
            success: false,
            data: {
                msg: 'Account not found'
            }
        }
    }
}

module.exports.getAllAccount = async (isNames=false) => {
    const accounts = await Account.find();
    if (accounts){
        let list = accounts.map(acct => {
            if (isNames){
                return {
                    accountNo: acct.accountNo,
                    name: acct.name
                };
            } else {
                return {
                    accountNo: acct.accountNo,
                    name: acct.name,
                    balance: acct.balance,
                    currency: acct.currency
                };
            }
        });
        return {
                success: true,
                data: list
            };
    } else {
        return {
            success: false,
            data: {
                msg: 'No Account found.'
            }
        }
    }
}

module.exports.addAccount = async (account) => {
    try {
        const { accountNo, name, balance, currency} = account;
        if (accountNo && name && balance && currency){
            const account = await Account.findOne({ accountNo: accountNo });
            if (account && account.accountNo === accountNo){
                return {
                    success: true,
                    data: {
                        msg: `Account No. ${accountNo} already exists.`
                    }
                }
            } else {
                const newAccount = new Account({
                    accountNo,
                    name,
                    balance,
                    currency
                });
                await newAccount.save();
                return {
                    success: true,
                    data: {
                        msg: 'Successfully inserted.'
                    }
                }
            }
        } else {
            return {
                success: false,
                data: {
                    msg: 'There is error in your data.'
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