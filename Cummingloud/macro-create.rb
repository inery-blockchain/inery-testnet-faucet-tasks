require 'dotenv/load'
require 'httparty'
require 'json'

url = ENV['NODE_URL']
private_key = ENV['PRIVATE_KEY']
account = ENV['INERY_ACCOUNT']
actor = ENV['INERY_ACCOUNT']

def create_transaction(id, user, data)
  header = {
    'Content-Type': 'application/json'
  }

  payload = {
    actions: [
      {
        account: account,
        name: 'create',
        authorization: [
          {
            actor: actor,
            permission: 'active'
          }
        ],
        data: {
          id: id,
          user: user,
          data: data
        }
      }
    ]
  }.to_json

  response = HTTParty.post(
    url,
    headers: header,
    body: payload
  )

  JSON.parse(response.body)
end

id = ARGV[0]
data = ARGV[1]

transaction = create_transaction(id, account, data)
puts transaction
