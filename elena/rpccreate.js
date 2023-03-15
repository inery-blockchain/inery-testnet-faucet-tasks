const transaction = {
    actions: [api.with(account).as(account).create(id, account, data)]
}

sendTransaction(transaction)
