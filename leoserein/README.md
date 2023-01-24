### Inery Blockchain RPC Transactions Example by leoserein
For run this command, you need to instal node.js on the link below:
- [NodeJS](https://nodejs.org/en/)
```shell
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
apt-get install -y nodejs
apt install npm
```

- Note: If the tools already installed on your platform, you can skip this step


### PRE USAGE SOLUTIONS

Change directory to directory leoserein

```shell
cd leoserein
```

Create .env and edit the variable PRIVATE_KEY=<YOUR PRIVATE KEY> INERY_ACCOUNT=<YOUR INERY ACCOUNT> and NODE_URL="http://<YOUR_SERVER_IP>:8888 based on your Inery Dashboard

```shell
nano .env
```

- Note: delete "<" and ">" symbol 

Install dependencies

```shell
npm install
```

### RUN RPC Push Transaction

Run Create Token

```
npm run createToken
```

Run Issue Token

```
npm run issueToken
```

Run Transfer Token

```
npm run transferToken
```

Run Retire Token

```
npm run retireToken
```