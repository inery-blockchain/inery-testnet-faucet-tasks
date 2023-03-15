import { createaction } from "./action/create.mjs";
import { deleteaction } from "./action/delete.mjs";
import { updateaction } from "./action/update.mjs";
import { readaction } from "./action/read.mjs";

const user = "ttlnnt";
const id = Math.floor(Math.random() * 10000);

async function main(id, user, data) {

  await createaction(
    id, user, `Transaction ${id} created successfully by ${user}.`
  );
  
  await readaction(
    id
  );
  
  await updateaction(
    id, `Transaction ${id} updated successfully via JSON RPC by ${user}.`
  ); 

  await deleteaction(
    id
  );   
}

main(id, user, "Create Transaction via JSON RPC Successfully"
);
