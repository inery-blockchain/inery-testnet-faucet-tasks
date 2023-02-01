require 'net/http'
require 'json'

node_url = "url"
private_key = ENV["PRIVATE_KEY"]
contract_account = "kuroz"
sender_account = "kuroz"

def perform_transaction(name, data)
  payload = {
    "actions" => [
      {
        "account" => contract_account,
        "name" => name,
        "authorization" => [
          {
            "actor" => sender_account,
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

  uri = URI(node_url)
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.path, headers)
  request.body = payload.to_json
  response = http.request(request)
  JSON.parse(response.body)
end

def create_record(record_id, user, data)
  response = read_record(record_id)
  if response["message"] == "No such ID"
    data = { "id" => record_id, "user" => user, "data" => data }
    perform_transaction("create", data)
  else
    puts "Record with ID #{record_id} already exists"
  end
end

def read_record(record_id)
  data = { "id" => record_id }
  perform_transaction("read", data)
end

def destroy_record(record_id)
  data = { "id" => record_id }
  perform_transaction("destroy", data)
end

def push_record(record_id, user, data)
  create_record(record_id, user, data)
  read_record(record_id)
  destroy_record(record_id)
end

push_record(69, sender_account, "RPC Push Transaction")
