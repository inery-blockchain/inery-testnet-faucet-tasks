from sc.cline_sc import Cline

cli = Cline(url="https://tas.blockchain-servers.world")

account_name = input("Account name : \n")

action_data = {
    "account": account_name,
}

# Get raw_abi of the account
get_raw_abi =cli.get_raw_abi(action_data['account'])

print(get_raw_abi)