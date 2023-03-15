from sc.cline_sc import Cline

cli = Cline(url="https://tas.blockchain-servers.world")

account_name = input("Account name : \n")

action_data = {
    "account": account_name,
}

# Get abi of the account
get_abi =cli.get_abi(action_data['account'])

print(get_abi)