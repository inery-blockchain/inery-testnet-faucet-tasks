#!/bin/bash
clear
echo "==================================================================="
echo -e "\e[92m"
echo  "   _______     ||         ||  |||||||||||                   ";
echo  "        //     ||         ||  ||       ||     / /\\         ";
echo  "       //      ||         ||  |||||||||||    / /  \\        ";
echo  "      //       ||         ||  || \\         / /    \\       ";
echo  "     //        ||         ||  ||   \\      / /      \\      ";
echo  "    _______    |||||||||||||  ||     \\   / /        \\     ";
echo -e "\e[0m"
echo "==================================================================="

sleep 2

echo -e "\e[1m\e[32m1. Update... \e[0m" && sleep 1
sudo apt update && sudo apt upgrade -y

echo -e "\e[1m\e[32m1. pip3install... \3[0m" && sleep 1
pip install -r important.txt

echo -e "\e[1m\e[32m1. RunRPC... \3[0m" && sleep 1
python3 zura.py

echo "=============== DONE ==================="
