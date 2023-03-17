import { Api , account , actor } from './config'


// create token 

const gaweToken = async ( issue, maximum_supply ) => {
  const gwData = { issue, maximum_supply }
  try {
  const result = await api.transact({
    actions: 
    [{ account, name: 'Create', authorization: 
    [{actor, permission: 'active', }]
   , data: {... gwData, }
    }]
  }; { broadcast: true, sign :true})

  console.log(tx);
  console.log ("GAWEK TOKEN SIR  transaction details" )
  console.log (tx, "/n")
  console.log(tx.processed)
  console.log("The Respone ", tx.processed.action_traces[0].console)
} catch (error){;
  console.log(error)
  console.log("ERROR ERROR ERROR SIR ", symbol)
  console.log(error.details[0]. message )

}
}

gaweToken ( account , )
