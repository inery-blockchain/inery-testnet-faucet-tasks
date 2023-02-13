<?php

$node_url = getenv('NODE_URL');
$private_key = getenv('PRIVATE_KEY');
$account = 'demigohu';
$actor = 'demigohu';

function perform_transaction($name, $data) {
    global $node_url, $private_key, $account, $actor;
    
    $payload = array(
        'actions' => array(
            array(
                'account' => $account,
                'name' => $name,
                'authorization' => array(
                    array(
                        'actor' => $actor,
                        'permission' => 'active'
                    )
                ),
                'data' => $data
            )
        )
    );

    $headers = array(
        'Content-Type: application/json'
    );

    $ch = curl_init($node_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

function create_transaction($id, $user, $data) {
    $data = array('id' => $id, 'user' => $user, 'data' => $data);
    return perform_transaction('create', $data);
}

function read_transaction($id) {
    $data = array('id' => $id);
    return perform_transaction('read', $data);
}

function destroy_transaction($id) {
    $data = array('id' => $id);
    return perform_transaction('destroy', $data);
}

function push_transaction($data_id, $user, $data) {
    create_transaction($data_id, $user, $data);
    read_transaction($data_id);
    destroy_transaction($data_id);
}

push_transaction(1, $account, 'This is RPC Push Transaction using PHP');
?>
