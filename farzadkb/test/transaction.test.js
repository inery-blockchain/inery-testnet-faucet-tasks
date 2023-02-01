const { expect } = require("chai");
const { Transaction } = require("../inery/models");
const { inery_node } = require("../inery/config");


describe("RPC API push transaction", () => {
    it("Tranfer asset to inery account", async () => {
      try {
        transaction_model = new Transaction();
        const result = await transaction_model.transfer_asset(inery_node.account_name, "inery", "1" + inery_node.token_name, "Transfer via rpc api push transaction");
        expect(result).to.not.be.null;
        expect(result.transaction_id).to.not.be.null
        console.log("TX ID: " + result.transaction_id);
      } catch (error) {
        expect(false).to.be.true;
      }
      
    });
    
    it("Create Data", async () => {
      try {
        transaction_model = new Transaction();
        const result = await transaction_model.create_data(200, inery_node.account_name, "Create data via rpc api push transaction");
        expect(result).to.not.be.null;
        expect(result.transaction_id).to.not.be.null
        console.log("TX ID: " + result.transaction_id);
        
      } catch (error) {
        expect(false).to.be.true;
      }
    });    
});
