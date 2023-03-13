function deleteData(uint256 id) public returns (bool) {
    IN3 in3 = new IN3();
    bytes memory encoded = abi.encodeWithSignature("delete(uint256)", id);
    in3.sendTransaction(IN3.IN3_RPC_URL, encoded);
    return true;
}
