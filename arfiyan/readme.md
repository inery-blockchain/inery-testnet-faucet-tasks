# The first step before we do is we need to test and minimize errors
# Inery Task 4 : Json RPC Sample
A Sample code to call JSON RPC on Inery Blockchain

## Persiapan
##### Remove Previous Nodejs
```
sudo apt-get remove nodejs
```

##### Install Curl

```
sudo apt-get install curl
```

##### Install NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

##### Install npm
```
sudo apt install npm
```
_____________________

## Installation

1. Clone the repo

   ```
   git clone https://github.com/inery-blockchain/ineryjs.git
   ```

2. Change directory to cloned repo

   ```
   cd ineryjs
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information

   ```
   nano .env
   ```

## Usage

Run RPC Example

```
npm run rpc-example
```

#### Successful Example
<p align="center">
  <img src="https://github.com/asabigbos/Images/blob/main/berhasil.png">
</p>

___________________________________________________

### Once it feels successful we proceed to the actual task
### Before running in order to prepare

- [NodeJS](https://nodejs.org/en/)

- NPM



### Stages to run

Change directory to ```arfiyan```

```shell
cd ./arfiyan
```

### Next you need to replace
Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY
INERY_ACCOUNT=YOUR INERY ACCOUNT

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run solution
```
