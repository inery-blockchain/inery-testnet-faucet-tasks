import json
import os
from eospy.cleos import Cleos

ce = Cleos(yoururl)#edit here

PRIVATE_KEY = os.environ.get('PRIV_KEYS') #edit here
ACTOR = os.environ.get('INERY_NAME')#edit here
ACCOUNT = 'username'#edit here

def create(id, user, data):
    payload = [
        {
            'account': ACCOUNT,
            'name': 'create',
            'authorization': [{
                'actor': ACTOR,
                'permission': 'active',
            }],
            'data': {
                'id': id,
                'user': user,
                'data': data
            },
        }
    ]
    trx = {"actions": payload}
    resp = ce.push_transaction(trx, key_strings=[PRIVATE_KEY], broadcast=True)
    print("=" * 75)
    print("=================== CREATE transaction information ====================")
    print("=" * 75)
    print(json.dumps(resp, indent=4))
    print("Response from contract :", resp['processed']['action_traces'][0]['console'])
    print()

def destroy(id):
    payload = [
        {
            'account': ACCOUNT,
            'name': 'destroy',
            'authorization': [{
                'actor': ACTOR,
                'permission': 'active',
            }],
            'data': {
                'id': id
            },
        }
    ]
    trx = {"actions": payload}
    resp = ce.push_transaction(trx, key_strings=[PRIVATE_KEY], broadcast=True)
    print("=" * 75)
    print("================== DESTROY transaction information ====================")
    print("=" * 75)
    print(json.dumps(resp, indent=4))
    print("Response from contract :", resp['processed']['action_traces'][0]['console'])
    print()

def main(id, user, data):
    create(id, user, data)
    destroy(id)

if __name__ == '__main__':
    main(1, ACCOUNT, "Mess")#edit here
