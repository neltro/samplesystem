import config from '../config/default.json'; 
import axios from 'axios';

export const getAccountNames = async () => {
    try{
        const url = `${config.sampleSystemAPI.account}/names`;
        const results = await axios.get(url);
        const accounts = await results.data;
        return accounts.data;
    } catch (err){
        return {
            success: false,
            msgs: err.response?.data?.errors ?? err 
        }
    }
}

export const getAccount = async (accounts, accountNo) => {
    const account = accounts && accounts.find(acct => acct.accountNo === accountNo);
    if (account){
        return account;
    }
}

export const getBalance = async (accounts, accountNo) => {
    const account = accounts && accounts.find(acct => acct.accountNo === accountNo);
    if (account){
        return account.balance;
    }
}