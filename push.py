# Import the Cline and INRKey classes
from api.cline import Cline
from api.keys import INRKey

# Set the URL for the EOSIO blockchain endpoint and the version of the API
url = 'http://YOUR_NODE_IP:YOUR_NODE_PORT' version = 'v1'

# Create an instance of the Cline class
eos = Cline(url, version)

# Get the chain's information to get the current block number and chain ID
chain_info = eos.get_info()
block_num = chain_info['head_block_num']
chain_id = chain_info['chain_id']

# Create an instance of the INRKey class with the private key
private_key = 'YOUR_PRIVATE_KEY'
inrkey = INRKey(private_key)

# Set the transaction parameters
sender = 'sender_account'
recipient = 'recipient_account'
amount = '1.0000 SYS'
memo = 'Example transaction'

# Create the transaction
transaction = {
    'ref_block_num': block_num,
    'ref_block_prefix': 0,
    'expiration': '2022-02-27T18:03:08',
    'actions': [{
        'account': 'eosio.token',
        'name': 'transfer',
        'authorization': [{
            'actor': sender,
            'permission': 'active'
        }],
        'data': {
            'from': sender,
            'to': recipient,
            'quantity': amount,
            'memo': memo
        }
    }],
    'signatures': [inrkey.sign(chain_id, transaction)]
}

# Send the transaction
response = eos.post('chain.push_transaction', json=transaction)

# Print the response
print(response)