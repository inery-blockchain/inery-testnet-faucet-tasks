use LWP::UserAgent;
use JSON qw( decode_json );

my $url = "http://node_url";
my $private_key = $ENV{'PRIVATE_KEY'};
my $account = "angga";
my $actor = "angga";

sub perform_transaction {
    my ($name, $data) = @_;

    my $payload = {
        "actions" => [
            {
                "account" => $account,
                "name" => $name,
                "authorization" => [
                    {
                        "actor" => $actor,
                        "permission" => "active"
                    }
                ],
                "data" => $data
            }
        ]
    };

    my $ua = LWP::UserAgent->new;
    my $response = $ua->post( $url, Content => to_json($payload) );
    return decode_json( $response->content );
}

sub create_transaction {
    my ($id, $user, $data) = @_;
    my $data = { id => $id, user => $user, data => $data };
    return perform_transaction("create", $data);
}

sub read_transaction {
    my ($id) = @_;
    my $data = { id => $id };
    return perform_transaction("read", $data);
}

sub destroy_transaction {
    my ($id) = @_;
    my $data = { id => $id };
    return perform_transaction("destroy", $data);
}

sub push_transaction {
    my ($data_id, $user, $data) = @_;
    create_transaction($data_id, $user, $data);
    read_transaction($data_id);
    destroy_transaction($data_id);
}

push_transaction(1, $account, "This is RPC Push Transaction using Perl");

