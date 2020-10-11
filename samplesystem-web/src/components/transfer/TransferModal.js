import React from 'react';
import { TransferFunds } from './TransferFunds';
import { constants } from '../../config/constants';

export const TransferModal = (props) => {
    return (
        <div className="modal fade" id="transferModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{constants.transfer.modal.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <TransferFunds closeModalHandler={props.closeModalHandler} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}