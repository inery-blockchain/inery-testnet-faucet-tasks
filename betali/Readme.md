### How to run

Change to directory solution

```shell
cd ~/rpc-solution
```

Install dependencies

```shell
npm install
```

Run the script

```shell
npm run PushTransactionTransfer
```

### Output
```shell
(async () => {
  const result = await api.transact({
    actions: [{
      account: 'inery.token',
      name: 'PushTransactionTransfer',
      authorization: [{
        actor: 'user1',
        permission: 'active',
      }],
      data: {
        from: 'user1',
        to: 'user2',
        quantity: '0.0001 INR',
        memo: ''
      }
    }]
  });
  console.log(result);
})();
```