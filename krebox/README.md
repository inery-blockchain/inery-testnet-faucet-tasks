## INERY blockchain sample RPC push transaction via JSON-RPC
## Install packet dependencies
```
curl https://deb.nodesource.com/setup_lts.x | bash
sudo apt install nodejs -y
npm install -g npm
```

## INSTALL module and set Variable 

### Change directory to `krebox`
```
cd krebox
```

### Install module dependencies
```
npm install
```

### edit and fill `.env` with your data
```
nano .env
```

##USAGE

###CALL RPC
##### `create` rpc action
```
npm run rpc-create
```

##### `update` rpc action
```
npm run rpc-update
```


### RPC push transaction with crud contract
##### `create` data action
```
npm run create
```

##### `read` data action
```
npm run read
```

##### `update` data action
```
npm run update
```

##### `destroy` data action
```
npm run destroy
```

### RPC push transaction with token contract
##### `create` token action
```
npm run create-inery.token
```

##### `issue` token action
```
npm run issue-inery.token
```

##### `transfer` token action
```
npm run transfer-inery.token

```



