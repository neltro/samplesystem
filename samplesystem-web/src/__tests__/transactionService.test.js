import { getTransactions, processTransfer, transferFunds} from '../services/transactionService';

test('Get All Transactions', async () => {
  const res = await getTransactions('111-1111-111');
  expect(res[0].amount).toBe(10000)
});

test('Validate for insufficent balance', async () => {
  const transaction = {
    accountNo: '111-1111-111',
    toAccountNo: '222-2222-222',
    description: 'Testing',
    amount: 10000000000,
    currency: 'HKD'
  }
  const res = await processTransfer(transaction);
  const message = res.errors[0].msg;
  const isRejected = message.search('Rejected:');
  expect(isRejected>-1).toBe(true);
})