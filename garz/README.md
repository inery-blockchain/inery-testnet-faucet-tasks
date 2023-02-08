import os
import subprocess

# Change directory
os.chdir('./garz')

# Install requirements
subprocess.run(["pip", "install", "-r", "requirements.txt"])

# Create .env and change its value
if not os.path.exists('.env'):
    subprocess.run(["cp", ".env-sample", ".env"])

# Change env variable to match with your info
os.environ["PKEY"] = "YOUR_PRIVATE_KEY"
os.environ["ACC"] = "YOUR_INERY_ACC"

# Run the script
subprocess.run(["python3", "./P-transaction.py"])
