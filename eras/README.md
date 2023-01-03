



## FAQ

#### 1. Error : Serialization time limit 15000us exceeded:

![](https://snipboard.io/a0drGN.jpg)

**How To Fix:**

Change ``max-transaction-time`` to more than ``15000`` in your ``config.ini``
```shell
nano ./inery-node/inery.setup/master.node/blockchain/config/config.ini
```

Thanks to **Kairos#2656**!


#### 2. Error : connect ECONNREFUSED NODE_IP_ADDRESS:8888

![](https://snipboard.io/UgSMH2.jpg)

**How To Fix:**

Make sure your port **8888** is open, try to check it on [portchecker.co](https://portchecker.co/) , each vps will have different settings, usually you need to open the port using this command
```
sudo ufw allow 8888
```

else, make sure to open your port setting on your VPS provider dashboard

#### 3. Error: missing create.issuer ( type=name )

It means that you doesn't have Valued Smart Contract on your account, which you created on Task 3.

![](https://snipboard.io/aTBHL3.jpg)

To check if you have your CRUD Smart Contract on your account

```
cline get abi your_inery_account
```

Make sure that you have this output on **actions** key

![](https://snipboard.io/0vsnOq.jpg)
