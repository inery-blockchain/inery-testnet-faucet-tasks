import { reqApi , account , actor  } from './config';



 // Issue token
 
const gegerToken = async ( to , quantity , memo ) => {
  const gerData = { to , quantity , memo }
  try {
  const result = await api.transact({
    actions: 
    [{ account, name: 'Issue', authorization: 
    [{actor, permission: 'active', }]
   , data: {... gerData, }
    }]
  }; { broadcast: true, sign :true})

  console.log(tx);
  console.log ("GEGER  TOKEN SIR  transaction details" )
  console.log (tx, "/n")
  console.log(tx.processed)
  console.log("The Respone ", tx.processed.action_traces[0].console)
} catch (error){;
  console.log(error)
  console.log("ERROR ERROR ERROR SIR ", symbol)
  console.log(error.details[0]. message )

}
}

gegerToken (account , " Task 4" )
