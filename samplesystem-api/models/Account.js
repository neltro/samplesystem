import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
})

export const Account = mongoose.model('account', AccountSchema);