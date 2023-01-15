#!/usr/bin/bash
clear
echo "++++++++++++++++++++++++++++++"
echo "+Task 4 Solution by: akiraini+"
echo "++++++++++++++++++++++++++++++"
sleep 2

# Make ENV

echo "Running the Program... "
sleep 1
echo "1.Insert Your Inery Account Name:"
read acc
echo "2.Insert Your Private key:"
read priv 
echo "3.Insert Your Node URL:"
read url
sleep 1
echo -e
 cat <<EOF | tee .env > /dev/null
INR_ACC="$acc"
PRIV_KEY="$priv"
INR_NODE_URL="http://$url:8888"
EOF

echo "One Last Step... "
