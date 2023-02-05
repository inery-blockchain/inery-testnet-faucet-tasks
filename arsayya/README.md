**Install Requirements**

```
pip install -r requirements.txt
```

**Create .env and change its value**

```
cp .env-example .env
```

**change env variable with your info**

```
INERY_NODE_RPC="http://IP:8888"
TOKEN_CONTRACT ="TOKEN_CONTRACT"
FROM_ACCOUNT ="SENDER_ACCOUNT"
TO_ACCOUNT ="RECIPIENT_ACCOUNT"
TOKEN_SYMBOL ="TOKEN_SYMBOL"
AMOUNT ="TRANSFER_AMOUNT"
MEMO ="TRANSFER_MEMO"
```

**run solution**

```
python3 ./transfer_token.py
```

