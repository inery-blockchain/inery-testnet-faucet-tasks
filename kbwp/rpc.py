from api.cline import Cline
from api.keys import INRKey


class IneryRPC:
    def __init__(self, account_name, private_key):
        self.clinee = Cline('https://tas.blockchain-servers.world')
        self.account_name = account_name
        self.private_key = private_key

    def abi_json_to_bin(self, account, action_name, action_data):
         data = self.clinee.abi_json_to_bin(account, action_name, action_data)
         return data
    
    def pushtransaction(self, trx, key, broadcast):
        result = self.clinee.push_transaction(trx, key, broadcast)
        return result

    def transact(self, action, action_data):
        
        action_data["user"] = self.account_name

        action_payload = {
            "account": self.account_name,
            "name": action,
            "authorization": [{
                "actor": self.account_name,
                "permission": "active"
            }]
        }

        data = self.abi_json_to_bin(self.account_name, action, action_data)
        action_payload['data'] = data['binargs']

        trx = {"actions": [action_payload]}
        key = INRKey(self.private_key)

        result = self.clinee.push_transaction(trx, key, broadcast=True)

        return result




"""
acc_from = input("Enter your account name: ")
acc_to = input("Enter the account name that use what transfer token: ")
quantity = input("Enter asset quantity with symbol ( Like 10 INR ): ")
memo = input("Enter memo for this transfer: ")
private_key = input("Enter your account private key: ")

response = inery_rpc.transfer(acc_from, acc_to, quantity, memo, private_key)
print(response)
"""