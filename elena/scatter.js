import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'

const network = {
    blockchain:'inery',
    host: 'localhost',
    port: 8888,
    protocol: 'http',
    chainId: '...'
}

ScatterJS.plugins( new ScatterEOS() )

async function sendTransaction(transaction) {
    const connected = await ScatterJS.scatter.connect('My-App')
    if (!connected) {
        return console.error('Failed to connect to Scatter.')
    }
    const scatter = ScatterJS.scatter
    const requiredFields = { accounts: [network] }
    await scatter.getIdentity(requiredFields)
    const eos = scatter.eos(network, Api, { rpc })
    const result = await eos.transact(transaction)
    console.log(result)
}

const transaction = {
    actions: [
        {
            account: 'ineryjs',
            name: 'create',
            authorization: [
                {
                    actor: 'useraccount',
                    permission: 'active',
                },
            ],
            data: {
                id: 1000,
                account: 'useraccount',
                data: 'INERY JSON-RPC CRUD push transaction',
            },
        },
    ],
}

sendTransaction(transaction)
