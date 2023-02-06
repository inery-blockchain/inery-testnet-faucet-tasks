require 'dotenv/load'
require 'httparty'

num = ARGV[0]

url = ENV['NODE_URL']
private_key = ENV['PRIVATE_KEY']

account = ENV['INERY_ACCOUNT']
actor = ENV['INERY_ACCOUNT']

response = HTTParty.post(
  url,
  body: {
    id: num,
    jsonrpc: '2.0',
    method: 'transact',
    params: [{
      actions: [
        account: account,
        name: 'read',
        authorization: [
          {
            actor: actor,
            permission: 'active'
          }
        ],
        data: {
          id: num
        }
      ]
    }]
  }.to_json,
  headers: { 'Content-Type': 'application/json' }
)

puts response.parsed_response
