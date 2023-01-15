#!/usr/bin/bash
clear
echo "++++++++++++++++++++++++++++++"
echo "+Task 4 Solution by: akiraini+"
echo "++++++++++++++++++++++++++++++"
sleep 2

# Install  NodeJS
echo "Installing... " 
sleep 1
echo -e 
sudo apt-get remove nodejs -y
sudo apt-get install curl
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
clear

# Install NPM
echo "Installing... "
sleep 1
echo -e
sudo apt install npm
clear

# Setup the Firewall
echo "Setting the Firewall... "
sleep 1
echo -e
sudo ufw allow 8888
clear
echo "Go to the Next Step"
