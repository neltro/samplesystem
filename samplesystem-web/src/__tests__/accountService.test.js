import { getAccount, getAccountNames } from '../services/accountService';

test('Get Account for 111-1111-111', async () => {
  const accounts = fakeData();
  let res = await getAccount(accounts, '222-2222-222');
  expect(res.accountNo).toBe('222-2222-222')
});

test('Get All Accounts', async () => {
  let res = await getAccountNames();
  expect(res[0].accountNo).toBe('111-1111-111')
});


function fakeData(){
  return [{
    accountNo: '111-1111-111',
    name: 'Account 1',
    balance: 10000,
    currency: 'HKD'
    },
    {
    accountNo: '222-2222-222',
    name: 'Account 2',
    balance: 0,
    currency: 'HKD'
    },
    {
    accountNo: '333-3333-333',
    name: 'Account 3',
    balance: 0,
    currency: 'HKD'
    }
  ]
}