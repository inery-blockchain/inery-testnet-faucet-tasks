from ineryLib import TransactionRPC

ineryRpc = TransactionRPC('https://tas.blockchain-servers.world')

accName = input("Enter your account name: ")
privateKey = input("Enter your account private key: ")

response = ineryRpc.transfer(accName, privateKey)

print(response)