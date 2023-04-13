import json
import datetime as dt
import pytz
from api.cline import Cline
from api import keys
from api.utils import *
import time


class TransactionRPC:
    def __init__(self, url):
        self.clinee = Cline(url)
        self.id = int(time.time())

    def abi_json_to_bin(self, account, actionName, actionData):
        data = self.clinee.abi_json_to_bin(account, actionName, actionData)
        return data

    def pushtransaction(self, trx, key, broadcast):
        result = self.clinee.push_transaction(trx, key, broadcast)
        return result

    def transfer(self, fromAccount, privateKey):

        data = {
            "id": self.id,
            "user": fromAccount,
            "data": f"data {self.id}"
        }

        acc = {
            "account": fromAccount,
            "name": "create",
            "authorization": [{
                "actor": fromAccount,
                "permission": "active"
            }],
            "data": self.abi_json_to_bin(fromAccount, "create", data)["binargs"]}

        trx = {
            "actions": [acc],
            "expiration": str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))
        }

        key = keys.INRKey(privateKey)

        result = self.clinee.push_transaction(trx, key, broadcast=True)

        return json.dumps(result, indent=4)
