import os

project_name = "garz"
version = "1.0.0"
description = "Inery Transaction Task4"
main_script = "run-rpc-task4.py"
author = "garz"
license = "MIT"
repository = {
    "type": "git",
    "url": "https://github.com/garz026/inery-testnet-faucet-tasks"
}
dependencies = [
    "ineryjs",
    "dotenv"
]

def run_main_script():
    os.system(f"python {main_script}")
