### Initial declaration
```js
    const {JsonRpc,JsSignatureProvider,Api}=require("ineryjs");
    const rpc=new JsonRpc("https://myurl");
    const signatureProvider=new JsSignatureProvider(["private key 1"]);
    const api=new Api({rpc,signatureProvider});
```
### Three ways to push transaction
1. ```js
    try{
        console.log(await api.transact({
                actions:[
                    {
                        account:"account_name",
                        name:"action_name",
                        authorization:[
                            {
                                actor:"actor_name",
                                permission:"actor_permission"
                            }
                        ],
                        data:{
                         ...data
                        }
                    }
                ]
        },{broadcast:true,sign:true}));
    }
    catch(error){
        console.error(error);
    }
   ```
2. ```js
    try{
        console.log(await api.transact({
            actions:[
                api.with("account_name").as("actor_name").action_name(...data);
            ]
        }));
    }
    catch(error){
        console.error(error);
    }
   ```
3. ```js
    try{
        const tx=api.buildTransaction();
        tx.with("account_name").as("actor_name").action_name(...data);
        console.log(await tx.send());
    }
    catch(error){
        console.error(error);
    }
   ```