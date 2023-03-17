from eospy.cleos import Cleos
import os
url = os.environ.get('NODE_URL')
ce = Cleos(url)
# Inery Smart Contract Account to Call
account = os.environ.get('INERY_ACCOUNT')
actor = 'suhar'

# private key
private_key = os.environ.get('PRIVATE_KEY')


def create(id, user, data):
    try:
        # create new transaction and sign it
        trx = {"actions":[{"account":account,"name":"create","authorization":[{"actor":actor,"permission":"active"}],"data":{"id":id, "user":user, "data":data}}]}
        opts = {"broadcast": True, "sign": True}
        resp = ce.push_transaction(trx, opts, [private_key])
        
        print(resp)
        print(resp['processed']['action_traces'][0]['console'])
    except Exception as e:
        print(e)


create(10, account, "Create new Data via JSON RPC")
