use JSON;
use LWP;
use Data::Dumper;

# Load environment variables
my $dotenv = 'path/to/.env';
open my $fh, '<', $dotenv or die "Can't open $dotenv: $!";
while (my $line = <$fh>) {
    chomp $line;
    if ($line =~ /^(.+?)=(.+)/) {
        $ENV{$1} = $2;
    }
}
close $fh;

# Set up node URL, private key, and Inery Smart Contract account
my $url = $ENV{'NODE_URL'};
my $private_key = $ENV{'PRIVATE_KEY'};
my $account = $ENV{'INERY_ACCOUNT'};
my $actor = $ENV{'INERY_ACCOUNT'};

sub create {
    my ($id, $user, $data) = @_;
    my $json = new JSON;
    my $ua = LWP::UserAgent->new;
    my $req = HTTP::Request->new(POST => $url);
    $req->header('Content-Type' => 'application/json');

    my $json_data = {
        "actions" => [
            {
                "account" => $account,
                "name" => "create",
                "authorization" => [
                    {
                        "actor" => $actor,
                        "permission" => "active"
                    }
                ],
                "data" => {
                    "id" => $id,
                    "user" => $user,
                    "data" => $data
                }
            }
        ],
        "sign" => true,
        "broadcast" => true,
    };
    $json_data->{'key_provider'} = $private_key;
    $req->content($json->encode($json_data));
    my $res = $ua->request($req);
    if ($res->is_success) {
        my $tx = $json->decode($res->decoded_content);
        print Dumper($tx);
    }
    else {
        print $res->status_line . "\n";
    }
}

create(5, $account, "Create new Data via JSON RPC");
