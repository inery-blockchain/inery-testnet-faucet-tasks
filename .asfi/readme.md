## How To Run 
## Install packet dependencies
```
curl https://deb.nodesource.com/setup_lts.x | bash
sudo apt install nodejs -y
npm install -g npm
```

## PRE-USAGE

### Change directory to `jambul.inery`
```
cd .asfi
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
npm run create-tok
```

##### `issue` token action
```
npm run issue
```

##### `transfer` token action
```
npm run transfer
```
