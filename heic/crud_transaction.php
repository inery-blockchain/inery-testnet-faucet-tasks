<?php
$url = "http://node_url";
$private_key = getenv("PRIVATE_KEY");
$account = "heic";
$actor = "heic";

function perform_transaction($name, $data) {
    global $url, $private_key, $account, $actor;

    $payload = array(
        "actions" => array(
            array(
                "account" => $account,
                "name" => $name,
                "authorization" => array(
                    array(
                        "actor" => $actor,
                        "permission" => "active"
                    )
                ),
                "data" => $data
            )
        )
    );

    $headers = array(
        "Content-Type: application/json",
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    $result = curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true);
}

function create_transaction($id, $user, $data) {
    $data = array("id" => $id, "user" => $user, "data" => $data);
    return perform_transaction("create", $data);
}

function read_transaction($id) {
    $data = array("id" => $id);
    return perform_transaction("read", $data);
}

function destroy_transaction($id) {
    $data = array("id" => $id);
    return perform_transaction("destroy", $data);
}

function push_transaction($data_id, $user, $data) {
    create_transaction($data_id, $user, $data);
    read_transaction($data_id);
    destroy_transaction($data_id);
}

push_transaction(1, $account, "This is RPC Push Transaction using PHP");

?>
