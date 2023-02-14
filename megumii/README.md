## Sample RPC push by megumii

## Install  dependencies

```
sudo apt update && sudo apt upgrade
```
```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs
```

- Check Node & NPM version

```
node -v
```
it should be `v18.0.0`

```
npm -v
```
it should be `8.6.0`


## Start

#### Change directory first

```
cd megumii
```

#### Install module
```
npm install
```

#### Set  env varariable in `.env` file

```
cp .env.example .env
nano .env
```

## How to use

### RPC push with token contract
##### **build** token action
```
npm run token-build
```

##### **deploy** token action
```
npm run token-deploy
```

##### **transfer** Token
```
npm run token-send
```

### RPC push with crud contract
##### **build** data action
```
npm run crud-build
```

##### **view** data action
```
npm run crud-view
```


##### **remove** data action
```
npm run crud-remove
```