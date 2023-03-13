function updateData(uint256 id, string memory data) public returns (bool) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("update(uint256,string)", id, data);
    in3.sendTransaction(IN3.IN3_RPC_URL, encoded);
    return true;
}
