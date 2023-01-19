## RPC Sample Push Transaction Via JSON-RPC

## Install packet dependencies
```
curl https://deb.nodesource.com/setup_lts.x | bash
sudo apt install nodejs -y
npm install -g npm
```

## INITIAL USAGE

### Change directory to `Your Directory`
```
cd samhan
```

### Install dependencies
```
sudo npm install
```

### Set the env vars in `.env`
```
sudo nano .env
```

## HOW TO OPERATE

### RPC push transaction with crud contract
##### `create` data
```
npm run create-crud
```

##### `read` data
```
npm run read-crud
```

##### `update` data
```
npm run update-crud
```

##### `destroy` data
```
npm run destroy-crud
```

### RPC push transaction with token contract
##### `create` token
```
npm run create-token
```

##### `issue` token
```
npm run issue-token
```

##### `transfer` token
```
npm run transfer-token
```

`DONE`