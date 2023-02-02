const { api, rpc, signatureProvider, TextEncoder, TextDecoder } = require("../ineryConnect");
const { inery_node } = require("../config");

class Transaction {
  constructor() {
    this.api = api
  }

  async transfer_asset(tr_from, tr_to, tr_asset_quantity, tr_memo) {
    try {
      const result = await this.api.transact(
        {
          actions: [
            {
              account: "inery.token",
              name: "transfer",
              authorization: [
                {
                  actor: inery_node.account_name,
                  permission: "active"
                }
              ],
              data: {
                from: tr_from,
                to: tr_to,
                quantity: tr_asset_quantity,
                memo: tr_memo,
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create_data(id, user, data) {
    try {
      const result = await this.api.transact(
        {
          actions:[
            {
                account: inery_node.account_name,
                name:"create",
                authorization:[
                    {
                        actor: inery_node.account_name,
                        permission:"active"
                    }
                ],
                data:{
                  id: id,
                  user: user,
                  data: data
                  
                }
            }
          ]
        },
        {
          broadcast:true,
          sign:true
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = Transaction;