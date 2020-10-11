import express from 'express';
import { check, validationResult } from 'express-validator';
import { getAccount, addAccount, getAllAccount } from '../services/accountService';
import { Account } from '../models/Account';

const router = express.Router();

router.get('/names',
async (req,res) => {
    const accounts = await Account.find();
    if (accounts){
        let list = accounts.map(acct => {
                return {
                    accountNo: acct.accountNo,
                    name: acct.name,
                    currency: acct.currency,
                    balance: acct.balance
                };
            });
        const response = {
                success: true,
                data: list
            };
        res.send(response);
    } else {
        const error = {
            success: false,
            data: {
                msg: 'No Account found.'
            }
        };
        res.status(400).json(error);
    }
    res.end;
});


router.get('/:accountno',
async (req,res) => {
    if (req.params.accountno){
        const result = await getAccount(req.params.accountno);
        if (result.success){
            res.send(result);
        } else {
            res.status(400).json(result);
        }
    }
});

router.get('/',
async (req,res) => {
    const accounts = await getAllAccount();
    res.send(accounts);
});

router.post('/',
[
    check('accountNo', 'Account No. is required.')
        .notEmpty(),
    check('name', 'Account Name is required.')
        .notEmpty(),
    check('balance', 'Balance is required')
        .notEmpty(),
    check('currency', 'Currency is required')
        .notEmpty()
],
async (req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        const result = await addAccount(req.body);
        if (result.success){
            res.send(result);
        } else {
            res.status(400).json(result);
        }
    } else {
        res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }
});

export default router;