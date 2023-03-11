Instalation
 
## Install Node Js And Npm
- curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
- sudo apt install -y nodejs

" Check version node -v and npm -v "
 
## Clone ineryjs
- git clone https://github.com/inery-blockchain/ineryjs

## Create New Dir Example Widya
- dir widya
- cd widya
- import all file to widya

## Edit And Push Npm
- cp env-ex .env
_ edit with nano and fill your node info
- npm install

## Run Script
- node wdy.mjs


NOTE : if u find error ' cannot find module pako' u need to install that

how to install pako to ineryjs

- cd ineryjs
- npm install pako

and u can try again push the wdy.mjs