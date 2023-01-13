### Prerequisites

- [Node.Js](https://nodejs.dev/en/)
```
sudo apt-get install curl
```

```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
- NPM

```
sudo apt install npm
```

### Installation

Change directory to ```dhamenz```

```shell
cd ./dhamenz
```

Copy ```.env-example``` 

```
cp .env-example .env
```

Edit ```.env``` with your info

```shell
nano .env
```

Install dependencies

```shell
npm install
```

### How to run

Create Data
```
npm run create
```

Read Data
```
npm run read
```

Update Data
```
npm run update
```

Delete Data
```
npm run delete
```

Run all the script

```
npm run crud
```