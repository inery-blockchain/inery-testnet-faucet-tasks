_________________________
### Prerequisite

- [NodeJS](https://nodejs.org/en/)
```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
- NPM
```shell
sudo apt install npm
```
- Note :
If it already exists, you can ignore the installation.
_________________________

### How to run

Change directory to directory diefky1212

```shell
cd ~/inery-testnet-faucet-tasks/diefky1212
```

##### Install dependencies

```shell
npm install
```

##### Run the script

```
npm run deffan
```

_________________________
#### Command to run TOKEN

##### For Build token
```
npm run build-token
```
##### For Issue token
```
npm run issue
```
##### For Send token
```
npm run send
```
##### For Retire token
```
npm run retire
```
_________________________

#### Command to run CRUD

##### For Build data
```
npm run build-data
```
##### For Destroy data
```
npm run destroy-data
```
##### For Update data
```
npm run update-data
```
##### For View data
```
npm run view-data
```
_________________________
