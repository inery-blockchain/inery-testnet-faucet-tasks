#!/usr/bin/perl

use strict;
use warnings;

use feature 'say';
use FindBin qw/$Bin/;
use lib "$Bin/../lib";

use Config::Simple;
use JSON::RPC::Client;

my $config = new Config::Simple('config.cfg');
my $account = $config->param('lovelia');
my $actor = $config->param('lovelia');

Create a JSON-RPC client
my $client = new JSON::RPC::Client();

Set the JSON-RPC endpoint URL
$client->ua->credentials(
$config->param('http://194.5.152.171:8888') => 'json-rpc',
'user' => 'password'
);

Define the JSON-RPC method to call
my $method = 'transact';

Define the JSON-RPC parameters
my $params = {
actions => [
{
account => $account,
name => 'destroy',
authorization => [
{
actor => $actor,
permission => 'active',
},
],
data => {
id => 1050,
},
},
],
};

Call the JSON-RPC method
my $result = $client->call($method, $params);

Check for any errors
if ($result->is_error) {
say "Error: " . $result->error_message;
} else {
say "Transaction ID: " . $result->result->{transaction_id};
}