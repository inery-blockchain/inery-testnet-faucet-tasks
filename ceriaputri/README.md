# INERY JSON RPC Push Transaction with Rust
This is a guide to show you how to make a JSON RPC push transaction using Rust. We will be using a contract code that includes the ineryjs library, dotenv library and the following functions: `create`, `destroy`, and `main`.

## Prerequisites
To complete this tutorial, you will need:

#### 1. Node.js and NPM installed on your machine
```
sudo apt-get remove nodejs; sudo apt-get install curl; curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && sudo apt-get install -y nodejs
```
```
sudo apt npm install
```
#### 2. inerjs 
```
https://github.com/CeriaPutriNiaku/ineryjs.git
```
#### 3. Rust and Cargo
```
curl https://sh.rustup.rs -sSf | sh
```
___________________________
## Create a Project
#### 1. Create a project with your inery account name:
```
mkdir <inery_account_name> && cd <inery_account_name>
```
#### 2. Create a Cargo.toml file and add the web3 dependency to it:
```
[dependencies]
web3 = "0.17.0"
```
#### 3. Create a `rpcmain.rs` file and add the following code:
```
extern crate web3;

use std::env;
use std::error::Error;
use std::str::FromStr;

use web3::contract::Contract;
use web3::types::{U256, Address};
use web3::types::H160;
use web3::transports::Http;
use web3::Web3;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    // Set up web3 provider
    let provider_uri = "http://<IP_VPS>:8888";
    let transport = Http::new(provider_uri)?;
    let web3 = Web3::new(transport);

    // Set up account and private key
    let actor = env::var("INERY_ACCOUNT")?;
    let private_key = env::var("PRIVATE_KEY")?;
    let from_addr = H160::from_str(&actor)?;

    // Set up contract
    let contract_addr = Address::from_str("<INERY_ADDRESS>")?;
    let contract_abi = include_bytes!("path/to/contract_abi.json");
    let contract = Contract::from_json(web3.eth(), contract_addr, contract_abi)?;

    // Create transaction
    let id = U256::from(123);
    let user = "alice".to_string();
    let data = "Some data".to_string();
    let tx = contract.call("create", (id, user, data), from_addr, Options::default().gas_price(1000000000.into()).gas(500000)).await?;

    // Display transaction hash
    println!("Transaction hash: {}", tx);

    // Destroy transaction
    let tx = contract.call("destroy", (id,), from_addr, Options::default().gas_price(1000000000.into()).gas(500000)).await?;

    // Display transaction hash
    println!("Transaction hash: {}", tx);

    Ok(())
}
```

Make sure to replace `<IP_VPS>` with the IP address of your VPS and `<INERY_ADDRESS>` with the address of the INERY contract you are using.

Also, make sure that you have set the environment variables INERY_ACCOUNT and PRIVATE_KEY used in the Rust code.

#### 4. Run the following command in the Ubuntu terminal to compile and execute your Rust code:
```
cargo run
```
If everything goes well.
