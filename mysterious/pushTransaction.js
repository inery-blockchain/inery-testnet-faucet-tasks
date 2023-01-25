const Eos = require("eosjs");
const eos = Eos({httpEndpoint: "http://185.169.252.86:8888"});
const privateKey = process.env.PRIVATE_KEY;

const accountName = "mysterious";
const contractName = "mysterious";

const createTransaction = async (id, user, data) => {
    try {
        const result = await eos.transaction({
            actions: [
                {
                    account: contractName,
                    name: "create",
                    authorization: [{
                        actor: accountName,
                        permission: "active"
                    }],
                    data: {
                        id: id,
                        user: user,
                        data: data
                    }
                }
            ]
        }, {keyProvider: [privateKey]});
        console.log("Transaction created successfully with Id: ", id);
    } catch (e) {
        console.error("Error creating transaction: ", e);
    }
}

const destroyTransaction = async (id) => {
    try {
        const result = await eos.transaction({
            actions: [
                {
                    account: contractName,
                    name: "destroy",
                    authorization: [{
                        actor: accountName,
                        permission: "active"
                    }],
                    data: {
                        id: id
                    }
                }
            ]
        }, {keyProvider: [privateKey]});
        console.log("Transaction destroyed successfully with Id: ", id);
    } catch (e) {
        console.error("Error destroying transaction: ", e);
    }
}

const pushTransaction = async (id, user, data) => {
    await createTransaction(id, user, data);
    await destroyTransaction(id);
}

pushTransaction(1020, accountName, "test push transaction by mysterious");
