import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db';
import accountRoute from './routes/account';
import transactionRoute from './routes/transaction';

const app = express();
const PORT = 5001;

// connect to DB
connectDB();

// init middleware
app.use(bodyParser.json());
app.use(express.json({ extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// define routes
app.use('/api/account', accountRoute);
app.use('/api/transaction', transactionRoute);

app.get('/', (req, res) => {
    res.send('root');
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})