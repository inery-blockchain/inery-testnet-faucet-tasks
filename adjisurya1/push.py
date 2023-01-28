import json

# import the Cline class
from your_file_path import Cline
# import the INRKey class
from your_file_path import INRKey

# create an instance of the Cline class
cline = Cline(url='https://your_url')

# create an instance of the INRKey class with your private key
private_key = 'your_private_key'
inrkey = INRKey(private_str=private_key)

# define the transaction details
transaction = {
    'actions': [{
        'account': 'your_account',
        'name': 'transfer',
        'authorization': [{
            'actor': 'your_actor',
            'permission': 'active',
        }],
        'data': {
            'from': 'your_actor',
            'to': 'recipient_account',
            'quantity': '1.0000 INR',
            'memo': 'example transaction',
        },
    }],
    'expiration': '2022-12-31T23:59:59',
    'ref_block_num': 0,
    'ref_block_prefix': 0,
}

# sign the transaction using the INRKey instance
signed_transaction = inrkey.sign_transaction(transaction)

# send the transaction using the Cline instance
response = cline.push_transaction(signed_transaction)

# print the response
print(json.dumps(response, indent=4))
