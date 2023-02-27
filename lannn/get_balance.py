from api.cline import Cline 

cli = Cline(url="https://tas.blockchain-servers.world")

account_name = input("Account name : \n")

action_data = {
    "account": account_name,
    "code":"inery.token",
    "symbol":"INR",
}

# Get Balance of the account
balance =cli.get_currency_balance(action_data['account'], action_data['code'], action_data['symbol'])

if balance :
    print(f"Account has {balance[0]}")
else :
    print(f"Account {account_name} doesn't have INR at all")