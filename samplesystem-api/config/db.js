import mongoose from 'mongoose';
import config from './default.json'

const db = config.mongoURL;

export const connectDB = async() => {
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