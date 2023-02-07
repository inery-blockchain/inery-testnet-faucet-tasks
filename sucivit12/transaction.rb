require 'rubygems'
require 'httpclient'
require 'json'

def main
  # setup JSON RPC
  json_rpc = HTTPClient.new("http://localhost:8888")

  # setup private key
  private_key = "your_private_key"
  signature_provider = private_key

  # the account and actor
  account = "sucivit12"
  actor = "sucivit12"

  # data for the function call
  data = {
    "id": 1,
    "user": actor,
    "value": "Data from ineryjs"
  }

  # make the function call
  result = json_rpc.post("/v1/chain/transact",
    {
      "actions": [
        {
          "account": account,
          "name": "create",
          "authorization": [
            {
              "actor": actor,
              "permission": "active"
            }
          ],
          "data": data
        }
      ],
      "signatures": [signature_provider],
      "compression": "none"
    }.to_json
  )

  # parse the result
  result = JSON.parse(result.body)

  # check if there was an error
  if result.has_key?("error")
    puts "Failed to create data: #{result["error"]}"
    return
  end

  puts "Transaction: #{result}"
end

main
