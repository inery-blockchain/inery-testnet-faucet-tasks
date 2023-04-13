# inery-task4
A bare bones REST API using Express for inery task 4

## Install 
`npm install`
## Install Ineryjs
`cd libs/ineryjs`
`npm install`

## Startup
`NODE_ENV=development npm start`

## Logging
### Logging level
`NODE_ENV=development LOGGING_LEVEL=debug npm start`

### Logging directory
The logging directory is specified using the `LOGGING_DIRECTORY` variable in the config file.

## Configuration
Uses separate config files in `/config` for each environment i.e `development`,`test`, and `production`

## Inery RPC API push transaction
`curl http://localhost:4000/inery/transfer`
