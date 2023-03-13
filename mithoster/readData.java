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
