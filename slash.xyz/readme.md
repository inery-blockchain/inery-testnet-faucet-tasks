**Change Directory**

```
cd ./slash.xyz
```

**Install Requirements**

```
pip install -r requirements.txt
```

**Copy .env-example to .env and change its value**

```
cp .env-example .env
```

**change env variable with your info**

```
INERY_NODE_URL= "Your_IP_Address"
PRIVATE_KEY= "Your_Private_Key"
TOKEN_CONTRACT= "Inery_Account"
ISSUER_ACCOUNT= "Inery_Account"
TOKEN_SYMBOL=  "Token_Symbol"
ISSUE_QUANTITY= "Issued_Ammount"
ISSUE_MEMO= "Memo"
```

**run**

```
python3 ./issue_token.py
```

