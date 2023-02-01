#!/usr/bin/perl

use strict;
use warnings;

use feature 'say';
use FindBin qw/$Bin/;
use lib "$Bin/../lib";

use Config::Simple;

my $config = new Config::Simple('config.cfg');
my $url = $config->param('http://194.5.152.171:8888');
my $account = $config->param('lovelia');
my $actor = $config->param('lovelia');
my $private_key = $config->param('private_key'); //account private_key

Create a JSON-RPC object
my $json_rpc = JSON::RPC->new();
$json_rpc->server($url);

Create a signature provider
my $signature = Signature::Provider->new($private_key);

Create an API object
my $api = API->new(rpc => $json_rpc, signature_provider => $signature);

Export the API and account/actor variables
export($api, $account, $actor);