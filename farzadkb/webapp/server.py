import os
import sys
import json
import subprocess
import random
import configparser

from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
from subprocess import PIPE

####################################
# Configuration
####################################

inery_config = configparser.ConfigParser()
inery_config.read('inery-config.ini') # Read config file

####################################
# Functions
####################################

def cline(args):
    if isinstance(args, list):
        command = ['cline']
        command.extend(args)
        command = ' '.join(command)
    else:
        command = 'cline ' + args
        
    print(command)
    results = subprocess.run(command, stdin=PIPE, stdout=PIPE, stderr=PIPE, shell=True, check=False)
    return results

# The Web Application Server
app = Flask(__name__)

def check_username(username):
    result = cline(['get', 'account', username])
    if result.returncode == 0:
        return True
    else:
        return False

####################################
# The route index
####################################

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

####################################
# RESTful API functions
####################################

@app.route('/api/getinfo', methods=['GET'])
def get_info():
    result = cline(['get', 'info'])
    rstmsg = result.stderr.decode('ascii')
    if not rstmsg.startswith('Fail'):
        return result.stdout
    else:
        return 'nodine connection failed', 500

@app.route('/api/unlock_wallet', methods=['POST'])
def unlock_wallet():
    cline(['wallet', 'unlock', '--name', inery_config['DEFAULT']['WALLET_NAME'], '--password', inery_config['DEFAULT']['WALLET_PASSWORD']])
    return '{}'


@app.route('/api/load_contacts', methods=['POST'])
def load_contacts():
    username = request.form.get('username')

    if (check_username(username) == False):
        return "user not found", 404

    result = cline(['get', 'table', inery_config['DEFAULT']['USERNAME'], inery_config['DEFAULT']['USERNAME'], 'mycontacts', '--key-type name --index 2 -L "'+ username +'" -U "' + username + '" --limit 100' ])
    result = json.loads(result.stdout)
    return jsonify(result['rows'])


@app.route('/api/update_contact', methods=['POST'])
def update_contact():
    unlock_wallet()
    id = request.form.get('id')
    firstname = request.form.get('firstname')
    family = request.form.get('family')
    phone = request.form.get('phone')
    email = request.form.get('email')
    params = '\'[' + id + ', "' + firstname + '", "' + family + '", "' + phone + '", "' + email + '"]\''
    result = cline(['push', 'action', inery_config['DEFAULT']['USERNAME'], 'update', params, '-p', inery_config['DEFAULT']['USERNAME']])
    print(result.stderr)
    if result.returncode == 0:
        return jsonify({'result': result.stderr.decode('ascii')})
    else:
        return result.stderr, 500


@app.route('/api/add_contact', methods=['POST'])
def add_contact():
    unlock_wallet()
    username = request.form.get('username')
    firstname = request.form.get('firstname')
    family = request.form.get('family')
    phone = request.form.get('phone')
    email = request.form.get('email')
    params = '\'["' + username + '", "' + firstname + '", "' + family + '", "' + phone + '", "' + email + '"]\''

    if (check_username(username) == False):
        return "user not found", 404

    result = cline(['push', 'action', inery_config['DEFAULT']['USERNAME'], 'insert', params, '-p', inery_config['DEFAULT']['USERNAME']])
    print(result.stderr)
    if result.returncode == 0:
        result = cline(['get', 'table', inery_config['DEFAULT']['USERNAME'], inery_config['DEFAULT']['USERNAME'], 'mycontacts', '--key-type name --index 2 -L "'+ username +'" -U "' + username + '" --limit 100' ])
        result = json.loads(result.stdout)
        return jsonify(result['rows'])
    else:
        return result.stderr, 500


@app.route('/api/delete_contact', methods=['POST'])
def delete_contact():
    unlock_wallet()
    id = request.form.get('id')
    username = request.form.get('username')
    if (check_username(username) == False):
        return "user not found", 404

    params = '\'[' + id + ']\''
    result = cline(['push', 'action', inery_config['DEFAULT']['USERNAME'], 'dlt', params, '-p', inery_config['DEFAULT']['USERNAME']])
    print(result.stderr)
    if result.returncode == 0:
        result = cline(['get', 'table', inery_config['DEFAULT']['USERNAME'], inery_config['DEFAULT']['USERNAME'], 'mycontacts', '--key-type name --index 2 -L "'+ username +'" -U "' + username + '" --limit 100' ])
        result = json.loads(result.stdout)
        return jsonify(result['rows'])
    else:
        return result.stderr, 500