**change push_tx.py variable with your info**

```
cline = Cline(url='https://your_url') //change with your node IP
private_key = 'your_private_key' // change with your private key
transaction = {
    'actions': [{
        'account': 'your_account', // change with your account name
        'name': 'transfer',
        'authorization': [{
            'actor': 'your_actor', // change with your account name
            'permission': 'active',
        }],
        'data': {
            'from': 'your_actor', // change with your account name
            'to': 'recipient_account', // change with recipient account name
            'quantity': '1.0000 INR', // replace with the number and name of the tokens you want to send
            'memo': 'example transaction',
        },
```

**run solution**

```
python3 ./push_tx.py
```

