import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { getAccount } from '../../services/accountService';
import { processTransfer } from '../../services/transactionService';
import { ErrorMessage } from './ErrorMessage';
import { constants } from '../../config/constants';

export const TransferFunds = (props) => {
    const { state } = useAppContext();
    const [accountName, setAccountName] = useState('');
    const [toAccountNo, setToAccountNo] = useState('');
    const [currency, setCurrency] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('0');
    const [errors, setErrors] = useState([]);
    const transferHandler = async (event) => {
        event.preventDefault();
        const payload = {
            accountNo: state.accountNo,
            toAccountNo: toAccountNo,
            description: description,
            amount: amount,
            currency: currency
        }
        const result = await processTransfer(payload);
        if (!result.success){
            setErrors(result.errors);
        } else {
            props.closeModalHandler();
        }
    }
    const resetInputEntries = () => {
        setToAccountNo('');
        setDescription('');
        setAmount('');
    }
    useEffect(() => {
        setErrors([]);
        resetInputEntries();
        getAccount(state.accounts, state.accountNo).then(acct => {
            if (acct){
                setCurrency(acct.currency);
                setAccountName(acct.name);
            }
        });
    },[state.accountNo,state.accountName,state.accounts])
    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="fromAccount">{constants.transfer.modal.fieldTitles.accountNo}</label>
                    <input type="text"
                           name="fromAccount" 
                           className="form-control" 
                           id="fromAccount" 
                           disabled 
                           value={accountName} />
                    <ErrorMessage
                           errors={errors}
                           field="accountNo" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="toAccountNo">{constants.transfer.modal.fieldTitles.toAccountNo}</label>
                    <select id="toAccountNo"
                            name="toAccountNo" 
                            className="form-control"
                            onChange={e => setToAccountNo(e.target.value)} 
                            value={toAccountNo}>
                        <option>{constants.transfer.modal.fieldTitles.chooseAccount}</option>
                        {
                            state.accounts && 
                            state.accounts.map((acct,ind) => {
                                if (acct.accountNo !== state.accountNo){                             
                                    return <option 
                                            key={ind} 
                                            value={acct.accountNo}>
                                            {acct.name}
                                            </option>
                                }
                                return ''
                            })
                        }
                    </select>
                    <ErrorMessage
                        errors={errors}
                        field="toAccountNo" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="description">{constants.transfer.modal.fieldTitles.description}</label>
                <input type="text" 
                       name="description"
                       className="form-control" 
                       id="description" 
                       placeholder="Description"
                       value={description}
                       onChange={e => setDescription(e.target.value)}/>
                <ErrorMessage 
                    errors={errors}
                    field="description"/>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="currency">{constants.transfer.modal.fieldTitles.currency}{currency}</label>
                    <input type="text" 
                           className="form-control" 
                           id="currency" 
                           value={currency} 
                           disabled/>
                    <ErrorMessage
                           errors={errors}
                           field="currency" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="amount">{constants.transfer.modal.fieldTitles.amount}</label>
                    <input type="number" 
                           name="amount"
                           className="form-control" 
                           id="amount"
                           min="1"
                           max="1000000000"
                           value={amount}
                           onChange={e => setAmount(e.target.value)}
                           />
                    <ErrorMessage 
                        errors={errors}
                        field='amount'/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" 
                        className="btn btn-primary" 
                        onClick={transferHandler.bind(this)}>
                        {constants.transfer.button.transfer}
                </button>
                <button type="button" 
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={props.closeModalHandler}
                        >{constants.transfer.button.close}
                </button>
            </div>
        </form>
    )
}


