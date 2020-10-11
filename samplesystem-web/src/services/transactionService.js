import config from '../config/default.json'; 
import axios from 'axios';

export const getTransactions = async (accountNo) => {
    try{
        const url = `${config.sampleSystemAPI.transaction}/${accountNo}`;
        const results = await axios.get(url);
        const transactions = await results.data;
        return transactions.data;
    } catch (err){
        return {
            success: false,
            msgs: err.response?.data?.errors ?? err 
        }
    }
}

export const transferFunds = async (props) => {
    try{
        const url = config.sampleSystemAPI.transaction;
        const payload = {
            accountNo: props.accountNo,
            toAccountNo: props.toAccountNo,
            description: props.description,
            amount: props.amount,
            currency: props.currency
        };
        const result = await axios.post(url,payload);
        return result.data;
    } catch (err){
        return {
            success: false,
            msg: err
        }
    }
}

export const processTransfer = async (payload) => {
    const result = await transferFunds(payload);
    if (!result.success){
        return {
            success: false,
            errors: result.msg.response.data.errors
        }
    } else {
        return { success: true }
    }
}