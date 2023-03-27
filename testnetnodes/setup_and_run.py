import os
import sys

def create_env():
    priv = input('Your privkey from inery: ')
    acc = input('Your inery account: ')
    with open('.env', 'w') as f:
        f.write(f'PRIVKEY={priv}\nACCOUNT={acc}\n')

def main_script():
    os.system('npm run solution')

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'cfg':
        create_env()
    else:
        main_script()

    print('Thanks...')
    sys.exit()
