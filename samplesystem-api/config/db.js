const mongoose = require('mongoose');
const config = require('./default.json');

const db = config.mongoURL;

const connectDB = async() => {
    try{
        await mongoose.connect(db, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true
        });
        console.log('MongoDB Connected...');
    } catch (err){
        console.log(err.message);
    }
}
module.exports = connectDB;