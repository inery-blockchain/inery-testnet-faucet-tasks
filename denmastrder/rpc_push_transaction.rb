require 'net/http'
require 'json'

url = "http://node_url"
private_key = ENV["PRIVATE_KEY"]
account = "denmastrder"
actor = "denmastrder"

def perform_transaction(name, data)
    payload = {
        "actions" => [
            {
                "account" => account,
                "name" => name,
                "authorization" => [
                    {
                        "actor" => actor,
                        "permission" => "active"
                    }
                ],
                "data" => data
            }
        ]
    }

    headers = {
        "Content-Type" => "application/json"
    }

    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path, headers)
    request.body = payload.to_json
    response = http.request(request)
    JSON.parse(response.body)
end

def create_transaction(id, user, data)
    data = { "id" => id, "user" => user, "data" => data }
    perform_transaction("create", data)
end

def read_transaction(id)
    data = { "id" => id }
    perform_transaction("read", data)
end

def destroy_transaction(id)
    data = { "id" => id }
    perform_transaction("destroy", data)
end

def push_transaction(data_id, user, data)
    create_transaction(data_id, user, data)
    read_transaction(data_id)
    destroy_transaction(data_id)
end

push_transaction(1, account, "This is RPC Push Transaction using Ruby")

