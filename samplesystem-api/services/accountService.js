import { Account } from '../models/Account';

export const getAccount = async (accountNo) => {
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

export const checkbalance = async (accountNo) => {
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

export const getAllAccount = async (isNames=false) => {
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

export const addAccount = async (account) => {
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