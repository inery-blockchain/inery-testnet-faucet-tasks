import json, requests
from binascii import hexlify


from api.types import *
from api.utils import *
from api.keys import *

class DynamicUrl:

    def __init__(self, url, version='v1', cache=None):
        self._cache = cache or []
        self._baseurl = url
        self._version = version

    def __getattr__(self, name):
        return self._(name)

    def __del__(self):
        pass

    def _(self, name):
        return DynamicUrl(url=self._baseurl, version=self._version, cache=self._cache + [name])

    def method(self):
        return self._cache

    def create_url(self):
        url_str = '{0}/{1}'.format(self._baseurl, self._version)
        for obj in self.method():
            url_str = '{0}/{1}'.format(url_str, obj)
        return url_str

    def get_url(self, url, params=None, json=None, timeout=30):
        # get request
        r = requests.get(url, params=params, json=json, timeout=timeout, verify=False)
        r.raise_for_status()
        return r.json()

    def post_url(self, url, params=None, json=None, data=None, timeout=30):
        # post request
        r = requests.post(url, params=params, json=json, data=data, timeout=timeout, verify=False)
        try:
            r.raise_for_status()
        except:
            raise requests.exceptions.HTTPError('Error: {}'.format(r.json()))
        return r.json()



class Cline:

    def __init__(self, url='https://tas.blockchain-servers.world', version='v1'):
        ''' '''
        self._prod_url = url
        self._version = version
        self._dynurl = DynamicUrl(url=self._prod_url, version=self._version)

    #####
    # private functions
    #####

    def get(self, func='', **kwargs):
        ''' '''
        cmd = eval('self._dynurl.{0}'.format(func))
        url = cmd.create_url()
        return cmd.get_url(url, **kwargs)

    def post(self, func='', **kwargs):
        ''' '''
        cmd = eval('self._dynurl.{0}'.format(func))
        url = cmd.create_url()
        return cmd.post_url(url, **kwargs)

    #####
    # get methods
    #####

    def get_info(self, timeout=30):
        ''' '''
        return self.get('chain.get_info', timeout=timeout)

    def get_chain_lib_info(self, timeout=30):
        ''' '''
        chain_info = self.get('chain.get_info', timeout=timeout)
        lib_info = self.get_block(chain_info['last_irreversible_block_num'], timeout=timeout)
        return chain_info, lib_info

    def get_block(self, block_num, timeout=30):
        ''' '''
        return self.post('chain.get_block', params=None, json={'block_num_or_id': block_num}, timeout=timeout)

    def get_account(self, acct_name, timeout=30):
        ''' '''
        return self.post('chain.get_account', params=None, json={'account_name': acct_name}, timeout=timeout)

    def get_code(self, acct_name, code_as_wasm=True, timeout=30):
        ''' '''
        return self.post('chain.get_code', params=None, json={'account_name': acct_name, 'code_as_wasm': code_as_wasm}, timeout=timeout)

    def get_accounts(self, public_key, timeout=30):
        ''' '''
        return self.post('history.get_key_accounts', params=None, json={'public_key': public_key}, timeout=timeout)

    def get_abi(self, acct_name, timeout=30):
        ''' '''
        return self.post('chain.get_abi', params=None, json={'account_name': acct_name}, timeout=timeout)

    def get_raw_abi(self, acct_name, timeout=30):
        ''' '''
        return self.post('chain.get_raw_abi', params=None, json={'account_name': acct_name}, timeout=timeout)

    def get_actions(self, acct_name, pos=-1, offset=-20, timeout=30):
        '''
        POST /v1/history/get_actions
        {"account_name":"inerynewyorkio","pos":-1,"offset":-20}
        '''
        json = {'account_name': acct_name, "pos": pos, "offset": offset}
        return self.post('history.get_actions', params=None, json=json, timeout=timeout)

    def get_currency(self, code='inery.token', symbol='INR', timeout=30):
        '''
        POST /v1/chain/get_currency_stats HTTP/1.0
        {"json":false,"code":"inery.token","symbol":"INR"}
        '''
        json = {'json': False, 'code': code, 'symbol': symbol}
        return self.post('chain.get_currency_stats', params=None, json=json, timeout=timeout)

    def get_currency_balance(self, account, code='inery.token', symbol='INR', timeout=30):
        '''
        POST /v1/chain/get_currency_balance HTTP/1.0
        {"account":"inery","code":"inery.token","symbol":"INR"}
        '''
        json = {'account': account, 'code': code, 'symbol': symbol}
        return self.post('chain.get_currency_balance', params=None, json=json, timeout=timeout)

    def get_currency_stats(self, code, symbol, timeout=30):
        return self.post('chain.get_currency_stats', json={'code': code, 'symbol': symbol})

    def get_servants(self, acct_name, timeout=30):
        ''' '''
        return self.post('account_history.get_controlled_accounts', params=None, json={'controlling_account': acct_name}, timeout=timeout)

    def get_transaction(self, trans_id, timeout=30):
        '''
        POST /v1/history/get_transaction
        {"id":"abcd1234"}
        '''
        return self.post('history.get_transaction', params=None, json={'id': trans_id}, timeout=timeout)

    def get_table(self, code, scope, table, index_position='', key_type='', lower_bound='', upper_bound='', limit=10, timeout=30):
        '''
        POST /v1/chain/get_table_rows
        {"json":true,"code":"inery","scope":"inery","table":"producers","index_position":"","key_type":"name","lower_bound":"","upper_bound":"","limit":10}
        '''
        json = {"json": True, "code": code, "scope": scope, "table": table, "key_type": key_type, "index_position": index_position, "lower_bound": lower_bound, "upper_bound": upper_bound, "limit": limit}
        return self.post('chain.get_table_rows', params=None, json=json, timeout=timeout)

    def get_producers(self, lower_bound='', limit=50, timeout=30):
        '''
        POST /v1/chain/get_producers HTTP/1.0
        {"json":true,"lower_bound":"","limit":50}
        '''
        return self.post('chain.get_producers', params=None, json={'json': True, 'lower_bound': lower_bound, 'limit': limit}, timeout=timeout)

    #####
    # set
    #####

    def set_abi(self, account, permission, abi_file, key, broadcast=True, timeout=30):
        #current_abi = Abi(self.get_abi(account)['abi'])
        #current_sha = sha256(current_abi.get_raw().encode('utf-8'))
        with open(abi_file) as rf:
            abi = json.load(rf)
            new_abi = Abi(abi)
            
            arguments = {
                "account": account,
                "abi": new_abi.get_raw()
            }
            payload = {
                "account": "inery",
                "name": "setabi",
                "authorization": [{
                    "actor": account,
                    "permission": permission,
                }],
            }
            # Converting payload to binary
            data = self.abi_json_to_bin(payload['account'], payload['name'], arguments)
            # Inserting payload binary form as "data" field in original payload
            payload['data'] = data['binargs']
            trx = {"actions": [payload]}
            sign_key = INRKey(key)
            return self.push_transaction(trx, sign_key, broadcast=broadcast)

    def set_code(self, account, permission, code_file, key, broadcast=True, timeout=30):
        current_code = self.get_code(account)
        current_sha = current_code['code_hash']
        with open(code_file, 'rb') as rf:
            wasm = rf.read()
            hex_wasm = hexlify(wasm)
            new_sha = sha256(hex_wasm)
            if current_sha == new_sha:
                raise INRSetSameCode()
            # generate trx
            arguments = {
                "account": account,
                "vmtype": 0,
                "vmversion": 0,
                "code": hex_wasm.decode('utf-8')
            }
            payload = {
                "account": "inery",
                "name": "setcode",
                "authorization": [{
                    "actor": account,
                    "permission": permission,
                }],
            }
            # Converting payload to binary
            data = self.abi_json_to_bin(payload['account'], payload['name'], arguments)
            # Inserting payload binary form as "data" field in original payload
            payload['data'] = data['binargs']
            trx = {"actions": [payload]}
            sign_key = INRKey(key)
            return self.push_transaction(trx, sign_key, broadcast=broadcast)



    def get_arguments(self, account, action) :

        abi = self.get_abi(account) 
        abi = abi['abi']
        mod = action[:2]
        arg={}
        if mod == "cr" :
            for struct in abi['structs'] :
                if struct['name'] == action :
                    for field in struct['fields'] :
                        name = field['name']
                        type = field['type']
                        arg[name] = input(f"Set {name} ({type}): ")

        elif mod == "up" :
            for struct in abi['structs'] :
                if struct['name'] == action :
                    for field in struct['fields'] :
                        name = field['name']
                        type = field['type']
                        if name == 'id' :
                            arg[name] = input(f"Select {name} ({type} key type) for update : ")
                        arg[name] = input(f"Update {name} ({type}): ")
        else :
            print("mod must be either 'cr' for create or 'up' for update")

        return arg


    def get_payload(self, account, action) :

        mod = action[:2]
        arguments = self.get_arguments(account, action, mod)
        payload = {"account" : account, "name" : action, "authorization" : [{"actor" : account, "permission": "owner"}]}

        data = self.abi_json_to_bin(account, action, arguments)
        data = json.loads(data)['binargs']

        payload['data'] = data

        return payload



    def push_transaction(self, transaction, keys, broadcast=True, compression='none', timeout=30):
        '''  '''

        chain_info, lib_info = self.get_chain_lib_info()
        trx = Transaction(transaction, chain_info, lib_info)
        
        # create digest for signing
        digest = sig_digest(trx.encode(), chain_info['chain_id'])

        print(digest)
        # sign the transaction
        signatures = []

        if not isinstance(keys, list):

            keys = [keys]

        for key in keys:

            signatures.append(key.sign(digest))
        
        # build final trx
        final_trx = {
            'compression': compression,
            'transaction': trx.__dict__,
            'signatures': signatures
        }

        data = json.dumps(final_trx, cls=INREncoder)
        if broadcast:
            return self.post('chain.push_transaction', params=None, data=data, timeout=timeout)
        print(data)
        return data

    def push_block(self, timeout=30):
        raise NotImplementedError

    #####
    # bin/json
    #####

    def abi_bin_to_json(self, code, action, binargs, timeout=30):
        ''' '''
        json = {'code': code, 'action': action, 'binargs': binargs}
        return self.post('chain.abi_bin_to_json', params=None, json=json, timeout=timeout)

    def abi_json_to_bin(self, code, action, args, timeout=30):
        ''' '''
        json = {'code': code, 'action': action, 'args': args}
        return self.post('chain.abi_json_to_bin', params=None, json=json, timeout=timeout)

    #####
    # create keys
    #####

    def create_key(self):
        ''' '''
        k = INRKey()
        return k

    def create_account(self, creator, creator_privkey, acct_name, owner_key,
                       active_key='', stake_net='1.0000 INR', stake_cpu='1.0000 INR', ramkb=8, permission='active',
                       transfer=False, broadcast=True, timeout=30):
        ''' '''

        # check account doesn't exist
        try:
            self.get_account(acct_name)
            #print('{} already exists.'.format(acct_name))
            raise ValueError('{} already exists.'.format(acct_name))
        except:
            pass
        if not active_key:
            active_key = owner_key
        # create newaccount trx
        owner_auth = {
            "threshold": 1,
            "keys": [{
                "key": owner_key,
                "weight": 1
            }],
            "accounts": [],
            "waits": []
        }
        active_auth = {
            "threshold": 1,
            "keys": [{
                "key": active_key,
                "weight": 1
            }],
            "accounts": [],
            "waits": []
        }
        print({
            'creator': creator,
            'name': acct_name,
            'owner': owner_auth,
            'active': active_auth
        })

        newaccount_data = self.abi_json_to_bin('inery', 'newaccount', {'creator': creator, 'name': acct_name, 'owner': owner_auth, 'active': active_auth})
        print(newaccount_data)
        newaccount_json = {
            'account': 'inery',
            'name': 'newaccount',
            'authorization': [
                {
                    'actor': creator,
                    'permission': permission
                }],
            'data': newaccount_data['binargs']
        }
        # create buyrambytes trx
        buyram_data = self.abi_json_to_bin('inery', 'buyrambytes', {'payer': creator, 'receiver': acct_name, 'bytes': ramkb * 1024})
        buyram_json = {
            'account': 'inery',
            'name': 'buyrambytes',
            'authorization': [
                {
                    'actor': creator,
                    'permission': permission
                }],
            'data': buyram_data['binargs']
        }
        # create delegatebw
        delegate_data = self.abi_json_to_bin('inery', 'delegatebw',
                                             {'from': creator, 'receiver': acct_name, 'stake_net_quantity': stake_net, 'stake_cpu_quantity': stake_cpu, 'transfer': transfer})
        delegate_json = {
            'account': 'inery',
            'name': 'delegatebw',
            'authorization': [
                {
                    'actor': creator,
                    'permission': permission
                }],
            'data': delegate_data['binargs']
        }

        trx = {"actions":
               [newaccount_json, buyram_json, delegate_json]
               }
        # push transaction
        return self.push_transaction(trx, creator_privkey, broadcast=broadcast, timeout=timeout)


