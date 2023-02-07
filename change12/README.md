## Prerequisite

### Make sure you have the latest version of .NET Core SDK installed on your computer.


1. Navigate to the project directory using the command prompt or terminal.

2. Add the EosSharp NuGet package to your project by running the following command:
```
dotnet add package EosSharp
```

3. Create .env file in the root of your project and add the following environment variables with their values:
```
NODE_URL=http://your-node-url:port
PRIVATE_KEY=your_private_key
INERY_ACCOUNT=your_eos_account
```

4.Build the project using the following command:
```
dotnet build
```

5. Run the script using the following command:
```
dotnet run
```