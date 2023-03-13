# Create an JSON-RPC Push Transaction using Solidity

- Install the in3 package by running the following command:
```
npm install in3
```
- Import the necessary packages in your Solidity contract:
```
pragma solidity ^0.5.0;

import "https://github.com/slockit/in3-solidity/contracts/usingIN3.sol";
```
- Define the `createData` function in your contract, which will create a new record in the database:
```
function createData(uint256 id, string memory data) public returns (bool) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("create(uint256,string)", id, data);
    in3.sendTransaction(IN3.IN3_RPC_URL, encoded);
    return true;
}
```
- Define the `readData` function in your contract, which will read a record from the database:
```
function readData(uint256 id) public returns (string memory) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("read(uint256)", id);
    bytes memory response = in3.send(IN3.IN3_RPC_URL, encoded);
    (bool success, bytes memory result) = abi.decode(response, (bool, bytes));
    if (success) {
        return abi.decode(result, (string));
    } else {
        return "";
    }
}
```
- Define the `updateData` function in your contract, which will update an existing record in the database:
```
function updateData(uint256 id, string memory data) public returns (bool) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("update(uint256,string)", id, data);
    in3.sendTransaction(IN3.IN3_RPC_URL, encoded);
    return true;
}
```
- Define the deleteData function in your contract, which will delete a record from the database:
```
function deleteData(uint256 id) public returns (bool) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("delete(uint256)", id);
    in3.sendTransaction(IN3.IN3_RPC_URL, encoded);
    return true;
}
```
- Deploy your contract to the blockchain.

- Call the functions from your Solidity contract to interact with the database. For example:
```
createData(1, "Hello World");
string memory data = readData(1);
updateData(1, "Hello INERY");
deleteData(1);
```
