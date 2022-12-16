# Inery-Blockchain-Task-IV
# Getting Started:   JSON RPC Sample code are available at example directory, you can try to modify and understand how it works, you also need to have Valued Smart Contract ( Task 3 ) in your Account, to able run your code and call the valued contract function.
   * Prerequisites
      1. Your Favorite Code Editor
      2. Git
      3. Node.Js
      - Ubuntu Installation Tutorial
         + Remove Previous Nodejs:  sudo apt-get remove nodejs
         + Install Curl:   sudo apt-get install curl
         + Install NodeJS: curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\ sudo apt-get install -y nodejs
         + Install Npm: sudo apt install npm
    * Installation
        - Clone the repo:  git clone https://github.com/alteregogi/ineryjs.git
        - Change directory to cloned repo:   cd ineryjs
        - Install NPM packages:  npm install
        - Copy .env-sample and rename it to .env:  cp .env-sample .env
        - Edit .env file with your information

# Usage
   - Run RPC Example:   npm run rpc-example
   - Successful Example: if you see similar error message after running npm run rpc-example, it means your transaction has been executed on blockchain using JsonRPC.

# FAQ
    - Error:Serialization time limit 15000us exceeded:
      + How To Fix:Change max-transaction-time to more than 15000 in your config.ini:   nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini
    - Error:connect ECONNREFUSED NODE_IP_ADDRESS:8888
      + How To Fix:Make sure your port 8888 is open, try to check it on portchecker.co, each vps will have different settings, usually you need to open the port using this command:   sudo ufw allow 8888
      + else, make sure to open your port setting on your VPS provider dashboard
    - Error: missing create.issuer ( type=name )
      + It means that you doesn't have Valued Smart Contract on your account, which you created on Task 3.
      + To check if you have your CRUD Smart Contract on your account:  cline get abi your_inery_account
      + Make sure that you have this output on actions key
