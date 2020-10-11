import React from 'react';
import { SelectAccount } from './SelectAccount';
import { TransferModal } from '../transfer/TransferModal';
import $ from 'jquery';
import { constants } from '../../config/constants';
import { useAppContext } from '../../hooks/useAppContext';
import { getTransactions } from '../../services/transactionService';
import {getAccountNames} from '../../services/accountService';

export default function Header () {
    const { state, setStates } = useAppContext();
    const closeModalHandler = () => {
        updateStates();
        $('#transferModal').modal('hide');
    } 
    const updateStates = () => {
        const fetchData = async() => {
            const transactions = await getTransactions(state.accountNo);
            const accounts = await getAccountNames();
            const payload = {
                transactions,
                accounts
            };
            setStates(payload);
        };
        fetchData();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">{constants.transfer.appTitle}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <SelectAccount />
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" 
                            data-toggle="modal"
                            data-target="#transferModal"
                            type="button"
                            >{constants.transfer.modal.title}</button>
                </form>
            </div>
            <TransferModal 
                closeModalHandler={closeModalHandler.bind(this)} 
                /> 
        </nav>
    )
}