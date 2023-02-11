#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";
use Userapi;
use account;
use actor;

sub Create {
my ($id, $user, $data) = @_;

eval {
my $hashtx = Userapi->transact(
{
actions => [
{
account => account,
name => "create",
authorization => [
{
actor => actor,
permission => "active",
},
],
data => {
id => $id,
user => $user,
data => $data,
},
},
],
},
{ broadcast => 1, sign => 1 }
);

bash
Copy code
print $hashtx, "\n";
};
if ($@) {
print $@, "\n";
}
}

sub Read {
my ($id) = @_;

eval {
my $hashId = Userapi->transact(
{
actions => [
{
account => account,
name => "read",
authorization => [
{
actor => actor,
permission => "active",
},
],
data => {
id => $id,
},
},
],
},
{ broadcast => 1, sign => 1 }
);
print $hashId, "\n";
};
if ($@) {
print $@, "\n";
}
}

sub Push {
my ($HasId, $user, $data) = @_;

Create($HasId, $user, $data);
Read($HasId);
}

Push(10543230, account, "inery task 4");