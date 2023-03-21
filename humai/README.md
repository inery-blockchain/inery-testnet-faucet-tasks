### Prerequisite for Python3 ###

## Install Requirements

pip install -r condition.txt

## Create .env and change its value

cp .env-sample .env

## change the env variable according to your info

- NODE_ADDRESS="http://IP:8888"
- TOKEN_CONTRACT ="TOKEN_CONTRACT"
- SEND_ACCOUNT ="INERY_ACCOUNT"
- TOKEN_SYMBOL ="TOKEN_SYMBOL"
- SEND_QUANTITY ="SEND_QUANTITY"
- SEND_MEMO ="SEND_MEMO"

## RUN THE DEPLOY

python3 ./sendtoken.py