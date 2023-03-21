# Getting Started with ineryjs using Go
This guide will help you to set up and run the ineryjs create function using Go 
1. Go installed in your system. You can download and install it from [here](https://golang.org/dl/.)
2. ineryjs installed and configured in your system. You can find the installation instructions from [here](https://github.com/inery-blockchain/ineryjs).
3. Valued smart contract deployed on inery blockchain.
4. An active inery account.
# Setup
1. Clone the ineryjs repository using the following command:
```
git clone https://github.com/inery-blockchain/ineryjs.git
```
2. change the directory to where the main.go file is located
3. Replace the following values with your values:
    `url` with your inery blockchain node endpoint.
    `private_key` with the private key of your inery account.
    `account` and `actor` with your inery account name.
4. Save the changes to the main.go file.
# Running the script
1. Open the terminal and navigate to the directory where the `main.go` file is located.
2. Run the following command to execute the script:
```
go run main.go
```
3. You should see the response of the inery blockchain in the terminal.
#Conclusion
Now, you have successfully created a transaction to call the create function in your valued smart contract using Go and ineryjs.
