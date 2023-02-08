### Prerequisite for Python3 ###

## Install Requirements

pip install -r condition.txt

## Create .env and change its value

cp .env-sample .env

## change the env variable according to your info

NODE_ADDRESS="http://IP:8888"
TOKEN_CONTRACT ="TOKEN_CONTRACT"
FROM_ACCOUNT ="MAILER_ACCOUNT"
FOR_ACCOUNT ="RECIVER_ACCOUNT"
TOKEN_SYMBOL ="TOKEN_SYMBOL"
QUANTITY ="TRANSFER_QUANTITY"
MEMO ="MEMO"

## RUN THE SEND

python3 ./transfer.py