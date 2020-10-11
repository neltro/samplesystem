import { useContext } from 'react';
import { AppContext } from '../context/appContext';

export const useAppContext = () => {
    const [state, setState] = useContext(AppContext);
    function setStates(params){
      const { transactions, accounts, accountName, accountNo } = params;
      setState({
        ...state,
        transactions: transactions || state.transactions,
        accounts: accounts || state.accounts,
        accountNo: accountNo || state.accountNo,
        accountName: accountName || state.accountName
      });
    }
    return {
      setStates,
      state
    }
}

