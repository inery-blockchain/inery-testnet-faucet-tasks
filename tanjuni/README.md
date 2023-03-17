# Json RPC Sample for Task 4 Inery Blockchain
A Sample code to call JSON RPC on Inery Blockchain
![](images/tanjuni.png)

### Prerequisites

- node js
- npm

### Installation

1. Clone the repo

   ```
   git clone -b task4 https://github.com/LampanKesuma/inery-testnet-faucet-tasks
   ```

2. Change directory to our rpc solution ~/tanjuni

   ```
   cd ~/inery-testnet-faucet-tasks/tanjuni
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Create `.env` file

   ```
   touch .env
   ```

5. Edit ```.env``` file with your information

- INERY_ACCOUNT="your_inery_account"
- PRIVATE_KEY="your_private_key"
- NODE_URL="http://your_IP_VPS:8888"

## Usage

Run RPC tanjuni

```
npm run tanjuni-rpc
```
or
```
node ./tanjuni-rpc/json-rpc.mjs
```
