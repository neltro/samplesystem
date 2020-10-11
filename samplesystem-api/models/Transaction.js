import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    tranNo: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        required: true
    },
    tranDate: {
        type: Date,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
})

export const Transaction = mongoose.model('transaction', TransactionSchema);