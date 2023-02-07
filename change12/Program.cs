using System;
using System.IO;
using EosSharp;

namespace CreateSmartContract
{
    class Program
    {
        static void Main(string[] args)
        {
            // Load configuration
            var url = Environment.GetEnvironmentVariable("NODE_URL");
            var privateKey = Environment.GetEnvironmentVariable("PRIVATE_KEY");
            var account = Environment.GetEnvironmentVariable("INERY_ACCOUNT");
            var actor = Environment.GetEnvironmentVariable("INERY_ACCOUNT");

            // Create EOS instance
            var eos = new Eos(new EosConfig
            {
                HttpEndpoint = url,
                SignatureProvider = new SignatureProvider(privateKey)
            });

            // Define data for smart contract
            var id = 1;
            var user = account;
            var data = "Task4";

            // Create the smart contract
            try
            {
                var result = eos.CreateTransaction(new Transaction
                {
                    actions = new List<EosSharp.Action> {
                        new EosSharp.Action
                        {
                            account = account,
                            name = "create",
                            authorization = new List<PermissionLevel> {
                                new PermissionLevel
                                {
                                    actor = actor,
                                    permission = "active"
                                }
                            },
                            data = new {
                                id,
                                user,
                                data
                            }
                        }
                    }
                }).Execute();

                Console.WriteLine(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
