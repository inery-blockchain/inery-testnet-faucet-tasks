## Prerequisite

### Instal curl
```
sudo apt-get install curl
```

### NodeJS & NPM
- [Windows](https://nodejs.org/en/download/) Included NPM packages
- Linux:
```
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```



## How to run?

**1. Change directory to `dnsarz`**

```shell
cd ./dnsarz
```


**2. Install dependencies**

```shell
npm install
```

**3. Create & edit `solution.` file**
```
const url = "http://yournodeIP:8888"
const private_key = "Your Private Keys";
const account = "Inery Account"
const actor = "Inery Account"
```

**4. Run the script**

```
npm run solution
```
