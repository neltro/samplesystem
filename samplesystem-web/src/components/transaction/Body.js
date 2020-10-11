import React from 'react';
import Header from './Header';
import { useAppContext } from '../../hooks/useAppContext';
import TransactionGrid from './TransactionGrid';

export const Body = (props) => {
    const { state } = useAppContext();
    return (
        <>
            <Header />
            <TransactionGrid rowData={state.transactions}/>
        </>
    )
}