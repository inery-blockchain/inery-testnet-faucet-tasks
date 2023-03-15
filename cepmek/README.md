## INERY blockchain sample RPC push transaction via JSON-RPC by cepmek with inery account `cepmek`

## Install packet dependencies
```
curl https://deb.nodesource.com/setup_lts.x | bash
sudo apt install nodejs -y
npm install -g npm
```

## PRE-USAGE

### Change directory to `cepmek`
```
cd cepmek
```

### Install module dependencies
```
npm install
```

### Set the env vars in `.env`
```
nano .env
```

## USAGE

### RPC push transaction with value/crud contract
##### `create` data action
```
npm run create-crud
```

##### `read` data action
```
npm run read-crud
```

##### `update` data action
```
npm run update-crud
```

##### `destroy` data action
```
npm run destroy-crud
```

### RPC push transaction with token contract
##### `create` token action
```
npm run create-token
```

##### `issue` token action
```
npm run issue-token
```

##### `transfer` token action
```
npm run transfer-token
```
