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
    let contract_addr = Address::from_str("<CONTRACT_ADDRESS>")?;
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
