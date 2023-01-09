#bin/bash
sudo dpkg --configure -a
exists()
{
  command -v "$1" >/dev/null 2>&1
}
if exists curl; then
echo ''
else
  sudo apt update && sudo apt install curl -y < "/dev/null"
fi

sleep 2 && curl -s https://raw.githubusercontent.com/node-ronin/testnet_tutorial/main/noderonin.sh | bash && sleep 2

Yellow='\033[33m'
Color_Off='\033[0m'

GIT_TO_FORK=inery-blockchain/inery-testnet-faucet-tasks

rm -rf inery-testnet-faucet-tasks

StepBox() {
  local text="$1"
  local box_width="$2"
  local box_char="$3"
  local text_width=${#text}
  local padding_width=$(((box_width - text_width) / 2))

  printf "\n\n"
  printf "$Yellow%s\n" "$(printf "%$((box_width))s" "" | tr ' ' "$box_char")"
  printf "%s%s%s\n" "$(printf "%*s%s%*s" $padding_width "" "$text" $padding_width "")"
  printf "%s\n$Color_Off" "$(printf "%$((box_width))s" "" | tr ' ' "$box_char")"
}

StepBox "Setup data sebelum menjalankan task 4" 80 "-"

read -p "$(printf "\033[33mMasukkan nama inery account kalian:\033[0m ")" INERY_ACCOUNT
read -p "$(printf "\033[33mMasukkan IP Node kalian:\033[0m ")" NODE_URL
read -p "$(printf "\033[33mMasukkan username github kalian:\033[0m ")" GITHUB_ACCOUNT

pre_setup(){
  if which git > /dev/null; then
    printf "\033[33mGit sudah terinstall, nggak perlu install lagi\033[0m\n"
  else
    sudo apt install git -y
  fi
  
#  if which node > /dev/null; then
#    printf "\033[33mNodeJS sudah terinstall, nggak perlu install lagi\033[0m\n"
#  else
#    curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
#    sudo apt install -y nodejs
#  fi

  if which curl > /dev/null; then
    printf "\033[33mCurl sudah terinstall, nggak perlu install lagi\033[0m\n"
  else
    type -p curl >/dev/null || sudo apt install curl -y
  fi

  if which gh > /dev/null; then
    echo "\033[33mGithub CLI sudah terinstall, nggak perlu install lagi\033[0m\n"
  else
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg &&
      sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg &&
      echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null &&
      sudo apt update &&
      sudo apt install gh -y
  fi

}


git_fork() {
  gh repo fork $GIT_TO_FORK --clone=true --remote=true
  cd inery-testnet-faucet-tasks
}

checkout_branch(){
  git checkout --track origin/task4
  mkdir $INERY_ACCOUNT
  cd $INERY_ACCOUNT/
}

create_env(){
cat <<EOF > .env-example
PRIVATE_KEY='INERY_PRIVATE_KEY'
INERY_ACCOUNT='INERY_ACCOUNT'
EOF
}

create_package_json(){
cat <<EOF > package.json
{
    "name": "$INERY_ACCOUNT-rpc-transaction",
    "version": "1.0.0",
    "description": "A sample rpc transaction for inery blockchain",
    "main": "./solution.mjs",
    "scripts": {
      "solution": "node ./solution.mjs"
    },
    "author": "$INERY_ACCOUNT",
    "license": "MIT",
    "repository": {
      "type": "git",
      "url": "https://github.com/$GITHUB_ACCOUNT/inery-testnet-faucet-tasks"
    },
    "homepage": "https://github.com/$GITHUB_ACCOUNT/inery-testnet-faucet-tasks",
    "dependencies": {
      "ineryjs": "github:inery-blockchain/ineryjs",
      "dotenv": "^16.0.3"
    }
}
EOF
}

create_readme(){
cat <<'EOF' > readme.md
### Prerequisite

- [NodeJS](https://nodejs.org/en/)

- NPM



### How to run

Change directory to ```CHANGE_WITH_YOUR_MAIN_INERY_ACCOUNT```

```shell
cd ./CHANGE_WITH_YOUR_MAIN_INERY_ACCOUNT
```

Create .env and edit the variable
PRIVATE_KEY=YOUR PRIVATE KEY
INERY_ACCOUNT=YOUR INERY ACCOUNT

```shell
nano .env
```

Install dependencies

```shell
npm install
```

Run the script

```
npm run solution
```
EOF

sed -i "s/CHANGE_WITH_YOUR_MAIN_INERY_ACCOUNT/$INERY_ACCOUNT/g" readme.md
}

create_solution_js(){
cat <<EOF > solution.mjs
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'ineryjs/dist/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const url = "http://$NODE_URL:8888"

const json_rpc = new JsonRpc(url) 
const private_key = process.env.PRIVATE_KEY
const actor = process.env.INERY_ACCOUNT

const account = "$INERY_ACCOUNT"
const signature  = new JsSignatureProvider([private_key]); 

const api = new Api({
    rpc: json_rpc,
    signatureProvider: signature
})

async function create(id, user, data){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"create",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id, user, data
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("=======================================================================")
        console.log("===================== CREATE transaction details ======================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}

async function destroy(id){
    try{
        const tx = await api.transact({
            actions:[
                {
                    account,
                    name:"destroy",
                    authorization:[
                        {
                            actor,
                            permission:"active"
                        }
                    ],
                    data:{
                        id
                    }
                }
            ]
        },{broadcast:true,sign:true})

        
        console.log("=======================================================================")
        console.log("===================== DESTROY transaction details =====================")
        console.log("=======================================================================")
        console.log(tx, "\n")
        console.log("Response from contract :", tx.processed.action_traces[0].console)
        console.log("\n")
    }catch(error){
        console.log(error)
    }
}


async function main(id, user, data){
    await create(id, user, data)
    await destroy(id)
}

main(1, account, "CRUD Transaction via JSON RPC")
EOF
}

create_solution(){
  printf "\033[33mNgopi dulu aja selo...\033[0m\n" 
  create_env
  create_package_json
  create_readme
  create_solution_js
}

git_commit(){
  git add .
  git commit -m "Update file"
}

git_push(){
  git push
}

git_pr(){
  gh pr create -B task4 -t "Task 4 - $INERY_ACCOUNT" -R $GIT_TO_FORK -f
}

StepBox "Install software yang di perlukan" 80 "-"
pre_setup
gh auth login

StepBox "STEP 1 : Fork Inery Task4 Git" 80 "-"
git_fork

StepBox "STEP 2 : Checkout Branch Ke Task 4" 80 "-"
checkout_branch

StepBox "STEP 3 : Create Solution" 80 "-"
create_solution

StepBox "STEP 4 : COMMIT CHANGE" 80 "-"
git_commit

StepBox "STEP 5 : PUSH ORIGIN" 80 "-"
git_push

StepBox "STEP 6 : Create PR with title Task 4 - $INERY_ACCOUNT" 80 "-"
git_pr
printf "\n\n\033[32mTASK 4 DONE! Check URL Di atas buat memastikan pull request kalian sudah di git inery\033[0m\n\n\n"
