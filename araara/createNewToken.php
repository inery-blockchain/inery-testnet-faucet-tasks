<?php

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$account = getenv("TOKEN_CONTRACT");
$issuer = getenv("ISSUER_ACCOUNT");
$symbol = getenv("TOKEN_SYMBOL");
$totalSupply = getenv("TOTAL_SUPPLY");
$privateKey = getenv("PRIVATE_KEY");

// TODO: PHP code to interact with Inery blockchain node and sign transactions

function createNewToken($issuer, $totalSupply) {
    // TODO: Implement the logic to send the "create" action to the token contract
    try {
        // TODO: Send the "create" action and get the response
        
        echo "CREATE transaction details:\n";
        // TODO: Log the transaction details
        
        echo "RPC Push transaction action CREATE details:\n";
        // TODO: Log the action trace details
    } catch (Exception $e) {
        echo "ERROR: Can't create token symbol $symbol\n";
        echo "DETAILS: " . $e->getMessage() . "\n";
    }
}

createNewToken($issuer, $totalSupply);