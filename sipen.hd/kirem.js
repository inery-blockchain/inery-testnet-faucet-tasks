import { Api , account , actor } from './config';


// transfer token

const kiremToken = async ( from, to, quantity, memo ) => {
  const remData = { from , to , quantity , memo }
  try {
  const result = await api.transact({
    actions: 
    [{ account, name: 'transfer', authorization: 
    [{actor, permission: 'active', }]
   , data: {... remData, }
    }]
  }; { broadcast: true, sign :true})

  console.log(tx);
  console.log ("KIREM TOKEN SIR  transaction details" )
  console.log (tx, "/n")
  console.log(tx.processed)
  console.log("The Respone ", tx.processed.action_traces[0].console)
} catch (error){;
  console.log(error)
  console.log("ERROR ERROR ERROR SIR ", symbol)
  console.log(error.details[0]. message )

}
}

kiremToken (account , "inery" " from me for you bro"  )
