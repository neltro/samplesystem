import express from 'express';
import { check, validationResult } from 'express-validator';
import { getTransactions, addTransaction } from '../services/transactionService';

const router = express.Router();

router.get('/:accountno',
async (req,res) => {
    if (req.params.accountno){
        const result = await getTransactions(req.params.accountno);
        if (result.success){
            res.send(result);
        } else {
            res.status(400).json(result);
        }
    }
});

router.post('/',
[
    check('accountNo', 'Transfer from Account No. is required.')
        .notEmpty(),
    check('toAccountNo', 'Transfer to Account No. is required.')
        .notEmpty(),
    check('description', 'Account Name is required.')
        .notEmpty(),
    check('amount', 'Amount is required and cannot be zero.')
        .not().isIn(['0','']),
    check('currency', 'Currency is required')
        .notEmpty()
],
async (req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        const result = await addTransaction(req.body);
        if (result.success){
            res.send(result);
        } else {
            res.status(400).json({
                success: false,
                errors: [ {
                    msg: result.data.msg,
                    param: result.data?.param ?? '',
                    field: result.data?.field ?? '',
                }]
            });
        }
    } else {
        res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
});

export default router;