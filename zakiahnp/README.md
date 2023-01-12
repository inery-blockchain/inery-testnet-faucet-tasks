### Prerequisite

- [NodeJS](https://nodejs.org/en/)

1. Change directory to directory ```zakiahnp```

```shell
cd ~/inery-testnet-faucet-tasks/zakiahnp
```

2. Create .env (Edit with your data and create)

```
cat > .env << END

INERY_ACCOUNT="YOUR_INERY_ACCOUNT"
PRIVATE_KEY="your_inery_privatekey"
NODE_URL="http://YOUR_IP:8888"

END
```

3. Run RPC Example
Create data via api 

```
node create.mjs
```

Update data via api
```
node update.mjs
```

