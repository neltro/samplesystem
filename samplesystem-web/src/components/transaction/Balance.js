import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { getBalance } from '../../services/accountService';

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    const { state } = useAppContext();
    getBalance(state.accounts, state.accountNo)
    .then(bal => setBalance(bal));
    return(
        <div className="card">
            <div className="card-body">
                Balance : {balance}
            </div>
        </div>
    )
}