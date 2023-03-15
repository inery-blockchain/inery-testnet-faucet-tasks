# Inery Task : RPC API 

## Install python3
```
apt get python3
```

## Clone ineryjs
```
git clone https://github.com/inery-blockchain/ineryjs.git
```

Create / copy file form file github :
- .env
- node.py
- cline_rpc.py
- keys_rpc.py
- types_rpc.py
- utils_rpc.py

## Install Requirements
```
pip install -r betalirpc.txt
```
## Create .env and change its value
```
cp .env-sample .env
```
## change the env variable according to your info
```
- NODE_ADDRESS="http://IP:8888"
- TOKEN_CONTRACT ="TOKEN_CONTRACT"
- SEND_ACCOUNT ="INERY_ACCOUNT"
- TOKEN_SYMBOL ="TOKEN_SYMBOL"
- SEND_QUANTITY ="SEND_QUANTITY"
- SEND_MEMO ="SEND_MEMO"
```
## RUN THE RPC
```
python3 ./rpcsend.py
```