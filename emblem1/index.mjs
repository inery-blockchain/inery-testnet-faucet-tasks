import { createController } from "./controller/ineryTransaction/createController.mjs";
import { deleteController } from "./controller/ineryTransaction/deleteController.mjs";
import { readController } from "./controller/ineryTransaction/readController.mjs";
import { updateController } from "./controller/ineryTransaction/updateController.mjs";

const user = "emblem1";
const myAcoount = "emblem1";
const actor = "emblem1";
const id = Math.floor(Math.random() * 10000);

async function master(id, user, myAcoount, actor, data) {
  //----------------------------------------------
  // create trancation
  //----------------------------------------------
  await createController(
    id,
    user,
    myAcoount,
    actor,
    "Create Transaction via JSON RPC Successfully"
  );

  //----------------------------------------------
  // read trancation
  //----------------------------------------------
  await readController(
    id,
    user,
    myAcoount,
    actor,
    "Read Transaction via JSON RPC Successfully"
  );

  //----------------------------------------------
  // update trancation
  //----------------------------------------------
  await updateController(
    id,
    user,
    myAcoount,
    actor,
    `Update ${id} Transaction via JSON RPC Successfully`
  );

  //----------------------------------------------
  // delete trancation
  //----------------------------------------------
  await deleteController(
    id,
    user,
    myAcoount,
    actor,
    `Delete ${id} Transaction via JSON RPC Successfully`
  );
}

master(
  id,
  user,
  myAcoount,
  actor,
  "Create Transaction via JSON RPC Successfully"
);
