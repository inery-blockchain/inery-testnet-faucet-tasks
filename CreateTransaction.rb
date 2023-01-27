require 'dotenv'
require 'json'
require 'net/http'

Dotenv.load

url = "http://74.208.90.129:8888"
private_key = ENV['PRIVATE_KEY']
account = "yayang12"
actor = "yayang12"

class Api
  def initialize(url, private_key, account, actor)
    @url = url
    @private_key = private_key
    @account = account
    @actor = actor
  end

  def create_transaction(id, user, data)
    hash_data = { id: id, user: user, data: data }
    payload = {
      actions: [
        {
          account: @account,
          name: "create",
          authorization: [
            {
              actor: @actor,
              permission: "active",
            },
          ],
          data: hash_data,
        },
      ],
    }

    uri = URI(@url)
    http = Net::HTTP.new
    request = Net::HTTP::Post.new(uri)
    request.body = payload.to_json
    request["Content-Type"] = "application/json"
    request["Accept"] = "application/json"
    request["Authorization"] = "Bearer #{@private_key}"

    response = http.request(request)
    json_response = JSON.parse(response.body)

    if response.code == "200"
      puts "Transaction created successfully!"
      puts json_response
    else
      puts "Error creating transaction: #{json_response['error']}"
    end
  end

  def destroy_transaction(id)
    payload = {
      actions: [
        {
          account: @account,
          name: "destroy",
          authorization: [
            {
              actor: @actor,
              permission: "active",
            },
          ],
          data: { id: id },
        },
      ],
    }

    uri = URI(@url)
    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Post.new(uri)
    request.body = payload.to_json
    request["Content-Type"] = "application/json"
    request["Accept"] = "application/json"
    request["Authorization"] = "Bearer #{@private_key}"

    response = http.request(request)
    json_response = JSON.parse(response.body)

    if response.code == "200"
      puts "Transaction destroyed successfully!"
      puts json_response
    else
      puts "Error destroying transaction: #{json_response['error']}"
    end
  end

  def push_transaction(data_id, user, data)
    create_transaction(data_id, user, data)
    destroy_transaction(data_id)
  end
end

api = Api.new(url, private_key, account, actor)
api.push_transaction(1020, account, "test push transaction by yayang12")
