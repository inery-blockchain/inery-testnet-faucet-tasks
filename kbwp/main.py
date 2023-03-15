from rpc import *
from consolemenu import *
from consolemenu.items import *


version = 1.0
inery_rpc = None

def root_menu_title():
    return "Main Menu"


def root_menu_subtitle():
    return 'Inery RPC API Push Transaction Sample v{}'.format(version)


def create_data():
    pu = PromptUtils(Screen())
    id = pu.input("Enter ID: ")
    data = pu.input("Enter Data: ")
    pu.enter_to_continue()
    action_data = {
        "id": id.input_string,
        "data": data.input_string
    }
    res = inery_rpc.transact("create", action_data)
    pu.println("\nTX ID:", res["transaction_id"], "\n")
    pu.enter_to_continue()


def destroy_data():
    pu = PromptUtils(Screen())
    id = pu.input("Enter ID: ")
    pu.enter_to_continue()
    action_data = {
        "id": id.input_string
    }
    res = inery_rpc.transact("destroy", action_data)
    pu.println("\nTX ID:", res["transaction_id"], "\n")
    pu.enter_to_continue()


def config():
    global inery_rpc
    account_name = input("Enter your account name: ")
    private_key = input("Enter your private key: ")
    inery_rpc = IneryRPC(account_name, private_key)


def main():
    menu = ConsoleMenu(root_menu_title, root_menu_subtitle)

    item1 = FunctionItem("Config", config)
    item2 = FunctionItem("Create Data", create_data)
    item3 = FunctionItem("Destroy Data", destroy_data)

    menu.append_item(item1)
    menu.append_item(item2)
    menu.append_item(item3)


    # Show the menu
    menu.start()
    menu.join()


if __name__ == "__main__":
    main()