## Prerequisite

#### Remove Previous Nodejs
```shell
sudo apt-get remove nodejs
```

#### Install Curl

```shell
sudo apt-get install curl
```

#### Install NodeJS

```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

#### Install npm
```shell
sudo apt install npm
```
_____________________


## How to run solution

#### Change directory to ```tanjuni```

```shell
cd ./tanjuni
```

#### Install dependencies

```shell
npm install
```

#### Copy `.env-sample` and rename it to `.env`
```shell
cp .env-sample .env
```

#### Edit ```.env``` file with your information

```shell
nano .env
```
####### PRIVATE_KEY=YOUR PRIVATE KEY
####### INERY_ACCOUNT=YOUR INERY ACCOUNT

#### Run the script

```shell
npm run solution
```
