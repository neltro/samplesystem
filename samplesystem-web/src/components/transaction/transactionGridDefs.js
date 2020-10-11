import { constants } from '../../config/constants';
import moment from 'moment';

export const transactionGridDefs = [
    { headerName: constants.gridHeader.date, 
      field: constants.gridFields.date,
      cellRenderer: (data) => {
          return moment(data.value).format('MM/DD/YYYY HH:mm');
      } },
    { headerName: constants.gridHeader.action, field: constants.gridFields.action },
    { headerName: constants.gridHeader.description, field: constants.gridFields.description },
    { headerName: constants.gridHeader.amount, field: constants.gridFields.amount },
    { headerName: constants.gridHeader.currency, field: constants.gridFields.currency }
];