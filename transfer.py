from eospy.cleos import Cleos
import os

url = os.environ.get('NODE_URL')

ce = Cleos(url) 
private_key = os.environ.get('PRIVATE_KEY')

account = os.environ.get('INERY_ACCOUNT') 
actor = os.environ.get('INERY_ACCOUNT') 
signature = [private_key] 
async def transfer():
    try:
        result = ce.push_action(
            account="inery.token",
            name="transfer",
            data={
                'from': 'suhar',
                'to': 'inery',
                'quantity': '10.0000 DDOT',
                'memo': 'Send test token'
            },
            authorization=[{
                'actor': 'suhar',
                'permission': 'active',
            }],
            sign=signature,
            broadcast=True
        )
        print(result)
        print(result['processed']['action_traces'][0])
    except Exception as e:
        print(str(e))

transfer()
