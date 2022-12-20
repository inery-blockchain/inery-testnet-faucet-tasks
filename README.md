<<<<<<< HEAD

# Inery Testnet Task 4
## Tutorial RPC API push transaction
Before you can run the code and call the valued contract 
function, you need to finish Task 3 in your Account. To check 
if you have your CRUD Smart Contract on your account. ``` 
cline get abi your_inery_account ```
### 1. Installation
#### Clone the repository
``` git clone https://github.com/asvifams/ineryjs.git ```
#### Change directory to cloned repository
``` cd ineryjs ```
#### Install NPM packages
![](https://i.imgur.com/aSuvjzE.png)
``` npm install ```
#### Copy .env-sample and rename it to .env
``` cp .env-sample .env ```
#### Edit .env file with your information
![](https://i.imgur.com/oA2OXr9.png)
Example: ``` INERY_ACCOUNT="asvifams" PRIVATE_KEY="QWERTY123" 
NODE_URL="http://46.101.134.14:8888/" ```
### 2. Testing
Run RPC Example ``` npm run rpc-example ``` if the message 
like this after running, your transaction has been executed 
on blockchain.
![](https://i.imgur.com/wgzd9eD.png)
### 3. Fixing
Thanks to: [alteregogi](https://github.com/alteregogi)
#### Error : Serialization time limit 15000us exceeded:
Change max-transaction-time to more than 15000 in your 
config.ini ``` nano 
./inery-node/inery.setup/master.node/blockchain/config/config.ini 
```
#### Error : connect ECONNREFUSED NODE_IP_ADDRESS:8888
Make sure to open your port setting on your VPS provider 
dashboard and make sure your VPS port **8888** is open, try 
to check it on [portchecker.co](https://portchecker.co/) ``` 
sudo ufw allow 8888 ```
#### Error: missing create.issuer ( type=name )
You doesn't have Valued Smart Contract on your account, this 
is on Task 3.
=======
RPC API push transaction Submit your code/software solution for pushing transactions with RPC API on Inery testnet blockchain. 
You will have to :
Clone this git repository.
Add your directory to Submit folder (Directory should be named as your blockchain account name)
Inside your directory, you will add your software solution for task 4
You will create a merge request and we will validate your work.
If you succeed we will accept your merge and you will complete task 4.

=======
# Task 4 RPC API push transaction

To complete task 4, you will need to follow the instructions provided:

  1. Clone the Git repository for the project.
  2. Add a new directory using your blockchain account name as the directory name.
  3. Inside the new directory, add your software solution for task 4, which should be a solution for pushing transactions with the RPC API on the Inery testnet blockchain.
  4. Create a merge request to submit your work for review.
  5. If your solution is successful, it will be accepted and you will complete task 4.

It's important to carefully follow the instructions provided and make sure that your solution meets the requirements for the task. Be sure to thoroughly test your code to ensure that it is working correctly before submitting it for review.
>>>>>>> 18c536114bede663c14e5056876a69f8468d6f0b
