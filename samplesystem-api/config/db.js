const mongoose = require('mongoose');
const db = require('./default.json').mongoURL;

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