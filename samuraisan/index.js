const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const url = 'http://154.26.155.62:8888';
const private_key = 5JhAoguLMDaaouSPrQrvv5htH1DEgaX2kN8J4TXnSSuXk73ry2S; // DUMMY PK

const create = async (id, user, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ${private_key},
            },
            body: JSON.stringify({
                id,
                user,
                data,
            })
        });
        const json = await response.json();
        console.log(json);
    } catch (err) {
        console.log(err);
    }
}

const destroy = async (id) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ${private_key},
            },
            body: JSON.stringify({
                id,
            })
        });
        const json = await response.json();
        console.log(json);
    } catch (err) {
        console.log(err);
    }
}

const push = async (id, user, data) => {
    await create(id, user, data);
    await destroy(id);
}

push(1020, 'Samuraisan', 'test push transaction by Samuraisan')
