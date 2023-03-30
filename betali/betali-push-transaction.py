from api.cline import Cline
from api.keys import INRKey

class IneryRPC:
    def __init__(self, url):
        self.clinee = Cline(url)

    def abi_json_to_bin(self, account, action_name, action_data):
         data = self.clinee.abi_json_to_bin(account, action_name, action_data)
         return data
    
    def pushtransaction(self, trx, key, broadcast):
        result = self.clinee.push_transaction(trx, key, broadcast)
        return result

    def transfer(self, from_account, to_account, quantity, memo, private_key):
        action_data = {
            "from": from_account,
            "to": to_account,
            "quantity": quantity, 
            "memo": memo,
        }

        action_payload = {
            "account": "inery.token",
            "name": "transfer",
            "authorization": [{
                "actor": from_account,
                "permission": "active"
            }]
        }

        data = self.abi_json_to_bin(action_payload['account'], action_payload['name'], action_data)
        action_payload['data'] = data['binargs']

        trx = {"actions": [action_payload]}
        key = INRKey(private_key)

        result = self.clinee.push_transaction(trx, key, broadcast=True)

        return result


inery_rpc = IneryRPC('https://tas.blockchain-servers.world')

acc_from = input("Enter your account name: ")
acc_to = input("Enter the account name that use what transfer token: ")
quantity = input("Enter asset quantity with symbol ( Like 10 INR ): ")
memo = input("Enter memo for this transfer: ")
private_key = input("Enter your account private key: ")

response = inery_rpc.transfer(acc_from, acc_to, quantity, memo, private_key)
print(response)