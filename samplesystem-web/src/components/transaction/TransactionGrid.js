import React from 'react';
import { AgGridReact } from "ag-grid-react";
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Balance } from '../transaction/Balance';
import { useAppContext } from '../../hooks/useAppContext';
import { transactionGridDefs } from './transactionGridDefs';

export default function TransactionGrid (props) {
      const { state } = useAppContext();
      return (
        <div className="myGridWrapper">
        { state.accountNo ? <Balance /> : '' }
            <div id="myGrid"
             className="ag-theme-alpine">
                <AgGridReact
                    columnDefs={transactionGridDefs}
                    rowData={props.rowData || []}>
                </AgGridReact>
            </div>
        </div>
    );
}