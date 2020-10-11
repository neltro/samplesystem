import React, { useEffect } from 'react';
import {getAccountNames} from '../../services/accountService';
import {getTransactions} from '../../services/transactionService';
import { useAppContext } from '../../hooks/useAppContext';

export const SelectAccount = (props) => {
    const { state, setStates } = useAppContext();
    const selectHandler = (accountNo,accountName) => {
        const fetchData = async() => {
            const results = await getTransactions(accountNo);
            const payload = {
                transactions: results, 
                accountName,
                accountNo
            };
            setStates(payload);
        };
        fetchData();
    };
    useEffect( () => {
        const fetchData = async() => {
            const accounts = await getAccountNames();
            if (accounts){
                setStates({accounts: accounts });
            }
        };
        fetchData();
    },[state.accountNo]);
    return(
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {state.accountName || "Select Account"}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                    state.accounts && state.accounts.map((acct,ind) => {
                        return <a 
                                className="dropdown-item"
                                href="#"
                                key={ind} 
                                onClick={() => selectHandler(acct.accountNo, acct.name)}>
                                {acct.name}
                                </a>
                    })
                }
            </div>
        </li>
    )
}