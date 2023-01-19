import { Api, JsonRpc, JsSignatureProvider } from '../dist/index.js'

const nodeUrl = process.env.NODE_URL
const rpc = new JsonRpc(nodeUrl)
const privateKey = process.env.PRIVATE_KEY
const signatureProvider = new JsSignatureProvider([privateKey])
const api = new Api({ rpc, signatureProvider })

const performTransfer = async (sender, recipient, amount, memo) => {
    try {
        const transaction = {
            actions: [{
                account: 'antabayanaka',
                name: 'transfer',
                authorization: [{
                    actor: sender,
                    permission: 'active'
                }],
                data: {
                    from: sender,
                    to: recipient,
                    quantity: amount,
                    memo
                }
            }]
        }
        const tx = await api.transact(transaction, { broadcast: true, sign: true })
        console.log(tx)
    } catch (error) {
        console.error(error)
    }
}

performTransfer('actor', 'inery', '1.0000 BAYAN', 'buy a cup of coffee, Dev ')
