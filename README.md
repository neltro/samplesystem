## Two Projects 

In the root folder you will see:

-samplesystem-api

-samplesystem-web

Go to folder samplesystem-api
### `npm install`
then
### `npm start` 

The api is running on [http://localhost:5001/]

These are the endpoints:
```
http://localhost:5001/api/transaction
http://localhost:5001/api/account
```

Go to folder samplesystem-web
### `npm install`
then
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

For Testing, you can go inside samplesystem-web
### `npm test`

I setup mongodb in the cloud (free version), no need to install in your local computer

2 documents

- accounts

    -I setup 3 records
    
    ```
    0: {accountNo: "111-1111-111", name: "Account 1", currency: "HKD", balance: 10000}
    1: {accountNo: "222-2222-222", name: "Account 2", currency: "HKD", balance: 0}
    2: {accountNo: "333-3333-333", name: "Account 3", currency: "HKD", balance: 0}
    ```
    
- transactions

    -I setup 1 transaction for beginning balance

    ```
    0: {action: "Credit", amount: 10000, currency: "HKD", description: "Initial Balance", tranDate: "2020-10-11T10:22:48.101Z", tranNo: "159066db-6a7b-4dd6-bb78-d41e12f84d72"
    ```
