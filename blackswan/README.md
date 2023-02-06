## How to run this script

1. Open a terminal or command prompt window and navigate to the directory containing the file.

2. Go to the directory.

```unix
cd ./blackswan
```

3. Run the following command to compile the code: 
```unix
go build rpc_push_transaction.go
```

4. Run the compiled binary file by executing: 
```unix
./rpc_push_transaction
```

5. The script will perform the push_transaction function, creating a transaction with ID 1, the user $account, and the data "This is RPC Push Transaction using Go".

Notes: Before running this script, make sure the node_url is accessible and the PRIVATE_KEY environment variable is set to the correct value.
