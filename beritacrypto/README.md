### Prerequisite for Python3 ###

## Install Requirements

pip install -r condition.txt

## Create .env and change its value

cp .env-sample .env

## change the env variable according to your info

NODE_ADDRESS="http://IP:8888"
TOKEN_CONTRACT ="TOKEN_CONTRACT"
BCTRANSFER_ACCOUNT ="INERY_ACCOUNT"
TOKEN_SYMBOL ="TOKEN_SYMBOL"
BCTRANSFER_QUANTITY ="BCTRANSFER_QUANTITY"
BCTRANSFER_MEMO ="BCTRANSFER_MEMO"

## RUN THE SEND

python3 ./bctransfer.py