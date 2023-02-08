import java.util.HashMap;

public class IneryWriter {
    public static void main(String[] args) {
        // setup JSON RPC
        String jsonRpc = "http://localhost:8888";

        // setup private key
        String privateKey = "your_private_key";

        // setup API
        HashMap<String, Object> apiMap = new HashMap<>();
        apiMap.put("rpc", jsonRpc);
        apiMap.put("signatureProvider", privateKey);

        // the account and actor
        String account = "your_account_name";
        String actor = "your_actor_name";

        // data for the function call
        HashMap<String, Object> dataMap = new HashMap<>();
        dataMap.put("id", 1);
        dataMap.put("user", actor);
        dataMap.put("value", "Data from ineryjs");

        // make the function call
        HashMap<String, Object> actionMap = new HashMap<>();
        actionMap.put("account", account);
        actionMap.put("name", "create");
        actionMap.put("authorization", new HashMap<String, String>() {{ 
            put("actor", actor);
            put("permission", "active");
        }});
        actionMap.put("data", dataMap);

        HashMap<String, Object> transactMap = new HashMap<>();
        transactMap.put("actions", new HashMap<String, Object>[]{actionMap});

        HashMap<String, Object> optionsMap = new HashMap<>();
        optionsMap.put("broadcast", true);
        optionsMap.put("sign", true);

        apiMap.put("transact", transactMap);
        apiMap.put("options", optionsMap);

        // result
        String result;
        try {
            result = apiMap.get("transact").toString();
        } catch (Exception e) {
            System.out.println("Failed to create data: " + e);
            return;
        }

        System.out.println("Transaction: " + result);
    }
}