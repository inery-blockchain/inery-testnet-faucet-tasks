import { addData } from "./inery-crud-services/add-data-on-chain.mjs";
import { readDataFromChain } from './inery-crud-services/read-data-on-chain.mjs';
import { INERY_ACCOUNT } from "./configServices/configuration.mjs";


const pushData = async (id, user, data) => {
    await addData(id, user, data);
    await readDataFromChain(id);
}

pushData(39, INERY_ACCOUNT, "ok cool")