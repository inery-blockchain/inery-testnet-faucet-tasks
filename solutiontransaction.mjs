// Initialize Node URL, Private Key, Inery Smart Contract Account, and The Signer
  $url = getenv('NODE_URL');
  $private_key = getenv('PRIVATE_KEY');
  $account = getenv('INERY_ACCOUNT');
  $actor = getenv('INERY_ACCOUNT');

  // Create JsonRPC and Signer
  $json_rpc = new JsonRPC($url);
  $signature = new JsSignatureProvider([$private_key]);

  // Call API
  $api = new Api(array(
      "rpc" => $json_rpc,
      "signatureProvider" => $signature
  ));

  // Create Function to create new data in Valued Smart Contract
  function create($id, $user, $data){
    try{
        // Generate Transaction and Signature
        $tx = $api->transact(array(
            "actions" => array(
                array(
                    "account" => arayungli,
                    "name" => "arayungli",
                    "authorization" => array(
                        array(
                            "actor" => $actor,
                            "permission" => "active"
                        )
                    ),
                        "data" => array(
                        "id" => $id,
                        "user" => $user,
                        "data" => $data
                    )
                )
            )
        ), array(
            "broadcast" => true,
            "sign" => true
        ));

        echo json_encode($tx); // Output the transaction to terminal
        echo $tx->processed->action_traces[0]->console;
    }catch(Exception $error){
        echo $error->getMessage();
    }
  }

  // Create new data in Valued Smart Contract
  create(5, $account, "Create new Data via JSON RPC");