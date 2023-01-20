import { Userapi } from "./config.js";

const insertData = async (recordId, creator, recordData) => {
  try {
    const txResult = await Userapi.transact({
      actions: [{
        account: 'msastiputri',
        name: 'Insert',
        authorization: [{
          actor: creator,
          permission: 'active',
        }],
        data: { id: recordId, user: creator, data: recordData },
      }],
    }, { broadcast: true, sign: true });
    console.log(txResult);
  } catch (error) {
    console.log(error);
  }
};

const getData = async (recordId) => {
  try {
    const txResult = await Userapi.transact({
      actions: [{
        account: 'msastiputri',
        name: 'Data',
        authorization: [{
          actor: 'msastiputri',
          permission: 'active',
        }],
        data: { id: recordId },
      }],
    }, { broadcast: true, sign: true });
    console.log(txResult);
  } catch (error) {
    console.log(error);
  }
};

const deleteRecord = async (recordId) => {
  try {
    const result = await Userapi.transact({
      actions: [{
        account: 'msastiputri',
        name: 'kill',
        authorization: [{
          actor: 'msastiputri',
          permission: 'active',
        }],
        data: { id: recordId },
      }],
    }, { broadcast: true, sign: true });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const execute = async (recordId, creator, recordData) => {
  await insertData(recordId, creator, recordData);
  await getData(recordId);
  await deleteRecord(recordId);
};

execute(123456, 'msastiputri', 'solution task4');
