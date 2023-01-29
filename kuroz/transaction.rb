require 'httparty'
require 'dotenv'

Dotenv.load

url = "url"
private_key = ENV['PRIVATE_KEY']
account = "kuroz"
actor = "kuroz"

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

  response = HTTParty.post(url, :body => payload.to_json, :headers => headers)
  return JSON.parse(response.body)
end

def create_transaction(id, user, data)
  data = { "id" => id, "user" => user, "data" => data }
  return perform_transaction("create", data)
end

def read_transaction(id)
  data = { "id" => id }
  return perform_transaction("read", data)
end

def destroy_transaction(id)
  data = { "id" => id }
  return perform_transaction("destroy", data)
end

def push_transaction(data_id, user, data)
  create_transaction(data_id, user, data)
  read_transaction(data_id)
  destroy_transaction(data_id)
end

push_transaction(80, account, "RPC Push Transaction by kuroz99")
