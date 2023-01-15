## An Inery Sample RPC Push Transaction Using JSON-RPC by akiraini
In this way, i make some automatic way to install dependencies and also set the .env 
I hope this solution can be more easier to run!

### Step 1: Install the package
```
chmod +x setup.sh
./setup.sh
```

### Step 2:Make sure move the directory to your own name directory. (example:akiraini)

```
cd akiraini
```

### Step 3: Installing npm in your directory
```
npm install
```

### Step 4: Run the automatic set and insert your own data (Account Name,Private Key, and IP)
```
chmod +x env-vars.sh
./env-vars.sh
```

### Step 5: Run the js script with npm
```
npm run rpc
```

### Done
