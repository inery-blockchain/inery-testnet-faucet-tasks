### Prerequisite for Python3 ###

## Install Requirements

pip install -r condition.txt

## Create .env and change its value

cp .env-sample .env

## change the env variable according to your info

NODE_ADDRESS="http://IP:8888"
TOKEN_CONTRACT = os.getenv("TOKEN_CONTRACT")
DEPLOY_CONTRACT_ACCOUNT = os.getenv("INERY_ACCOUNT")
TOKEN_SYMBOL = os.getenv("TOKEN_SYMBOL")
DEPLOY_CONTRACT_QUANTITY = os.getenv("DEPLOY_CONTRACT_QUANTITY")
DEPLOY_CONTRACT_MEMO = os.getenv("_DEPLOY_CONTRACT_MEMO")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

## RUN THE SEND

python3 ./deploy_contract.py