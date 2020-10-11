const mongoose = require('mongoose');

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

const Account = mongoose.model('account', AccountSchema);

module.exports = Account;