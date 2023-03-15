from api.cline import Cline
from flask import Flask, request, render_template, redirect
import datetime as dt
import pytz, argparse
import api.keys as keys
import time
import os
from api.utils import *
import json
from dotenv import load_dotenv

load_dotenv()

app         = Flask(__name__)
api         = Cline()

account     = os.environ.get('ACCOUNT')
privatekey  = os.environ.get('PRIVATE_KEY')
table       = 'records'

def checkConfig():
    if (os.path.isfile('.env')):
        return False if not account or not privatekey or account is None or privatekey is None else True
        
    return False

def get():
    try:
        tableJs = api.get_table(account, account, table, limit=2000)
        if (not tableJs['rows']):
            tableJs = []
    except Exception as e:
        tableJs = e
    return render_template('components/listData.html', datas=tableJs)

def push(mod, trans_id, text):
    action = mod
    
    if (action == 'cr' or action == 'up'):
        action_data = {
            "id": int(time.time()) if action == 'cr' else trans_id, 
            "owner": account,
            "data": text
        }
    elif (action == 'dl'):
        action_data = {
            "id": trans_id
        }
    else:
        redirect("/", code=302)

    payload = {
        "account": account,
        "name": action + table,
        "authorization": [{
            "actor": account,
            "permission": "owner",
        }]
    }

    # Converting payload to binary
    data = api.abi_json_to_bin(account, action + table, action_data)
    payload['data'] = data['binargs']

    # final transaction formed
    trx = {"actions": [payload]}
    trx['expiration'] = str((dt.datetime.utcnow() + dt.timedelta(seconds=60)).replace(tzinfo=pytz.UTC))

    key = keys.INRKey(privatekey)
    
    try:
        resp = api.push_transaction(trx, key, broadcast=True)
        result = json.dumps(resp, indent = 4) 
    except Exception as e:
        result = e

    return result

@app.route("/", methods=["GET"])
def view_index():
    if (not checkConfig()):
        return render_template("index.html", datas="Please insert your account / private key in .env file")

    return render_template("index.html")

@app.route("/get", methods=["GET"])
def getData():
    return get()

@app.route("/create", methods=["POST"])
def createData():
    f           = ''
    message     = request.form['text']
    name        = 'cr'
    trans_id    = ''
    f           = push(name, trans_id, message)

    if(f):
        print(f)
        return f

@app.route("/edit/<data_id>", methods=["POST"])
def editData(data_id):
    f           = ''
    message     = request.form['text']
    name        = 'up'
    trans_id    = data_id
    f           = push(name, trans_id, message)

    if(f):
        print(f)
        return f

@app.route("/delete/<data_id>", methods=["POST"])
def delete_data(data_id):
    f           = ''
    message     = ''
    name        = 'dl'
    trans_id    = data_id
    f           = push(name, trans_id, message)

    if(f):
        print(f)
        return f

if __name__ == "__main__":
    app.run(debug=True)
