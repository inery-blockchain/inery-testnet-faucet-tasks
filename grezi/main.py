import os
import sys

def create_env():
    with open('.env','w') as en:
        priv = input('Your privkey from inery : ')
        acc = input('your inery account : ')
        create = f'PRIVKEY={priv}\nACCOUNT={acc}'
        en.write(create)

def main_script():
    os.system('npm run solution')

if len(sys.argv) > 1:
	if sys.argv[1] == 'cfg':
		create_env()
	else:
		print('Command not found')
		sys.exit()
else:
	main_script()
	sys.exit('thanks . . . ')

