<?php
require_once '../dist/index.php';
use \Api\Api;
use \Rpc\JsonRpc;
use \Rpc\RpcError;
use \Signature\JsSignatureProvider;
use \Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$server = $_ENV['server_name'];
$provide = new JsonRpc($server);
$newKey = $_ENV['key_private'];
$actor = $_ENV['name_account'];
$validation = new JsSignatureProvider([$newKey]);
$get = new Api(['rpc' => $provide, 'signatureProvider' => $validation]);

async function push($contract, $action, $data, $actor, $permission) {
  try {
    $tx = await $get->transact([
      'actions' => [
        [
          'account' => $contract,
          'name' => $action,
          'authorization' => [[ 'actor' => $actor, 'permission' => $permission ]],
          'data' => $data
        ]
      ]
    ], ['broadcast' => true, 'sign' => true]);
    echo $tx."\n";
    echo "Response from contract:", $tx['processed']['action_traces'][0]['console'];
  } catch (Exception $error) {
    echo $error;
  }
}

async function get_create($id, $user, $data) {
  await push("rizal21", "create", ['id' => $id, 'user' => $user, 'data' => $data], $actor, "active");
}

async function get_destroy($id) {
  await push("rizal21", "destroy", ['id' => $id], $actor, "active");
}

async function main($id, $user, $data) {
  await get_create($id, $user, $data);
  await get_destroy($id);
}

main(148, $_ENV['name_account']);
?>
