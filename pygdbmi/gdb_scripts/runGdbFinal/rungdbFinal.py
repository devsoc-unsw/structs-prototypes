import subprocess
import json

# Prompt user for variable name and line number
variable_name = input("Enter the variable name for the linked list: ")
line_number = input("Enter the line number to set a breakpoint: ")

# Construct the GDB script
gdb_script = f"""
python
import gdb
import json

# Define a custom command to extract the linked list nodes
class NodeListCommand(gdb.Command):
    def __init__(self):
        super(NodeListCommand, self).__init__("nodelist", gdb.COMMAND_USER)

    def invoke(self, arg, from_tty):
        linked_list = gdb.parse_and_eval("{variable_name}")
        nodes = []

        # Traverse the linked list and collect node information
        n = linked_list["head"]
        while n:
            data = int(n["data"])
            address = str(n)
            next_address = str(n["next"]) if n["next"] else None

            node = {{"Data": data, "Address": address, "Next": next_address}}
            nodes.append(node)

            n = n["next"]

        # Store the nodes as an array of dictionaries
        nodes_dict = {{"Nodes": nodes}}
        print(json.dumps(nodes_dict))

NodeListCommand()
end

file linked_list
break {line_number}
run
nodelist
continue
quit
"""

# Run GDB with the script
command = f"echo '{gdb_script}' | gdb -q"
output = subprocess.check_output(command, shell=True).decode("utf-8")

# Find the JSON data in the GDB output
json_start = output.find("{")
json_end = output.rfind("}") + 1
json_data = output[json_start:json_end]

# Parse the JSON data into a Python dictionary
try:
    nodes_dict = json.loads(json_data)
    nodes = nodes_dict["Nodes"]
    print(nodes)

    print()
    print(nodes[1])
    print(nodes[1]["Data"])

except json.JSONDecodeError as e:
    print(f"Failed to parse JSON data: {str(e)}")
