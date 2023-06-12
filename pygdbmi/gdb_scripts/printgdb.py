import subprocess

# Prompt user for variable name and line number
variable_name = input("Enter the variable name for the linked list: ")
line_number = input("Enter the line number to set a breakpoint: ")

# Construct the GDB script
gdb_script = f"""
define plist
  set var $n = {variable_name}->head
  while $n
    printf "%d ", $n->data
    printf "%p ", $n
    printf "%p\\n", $n->next
    set var $n = $n->next
  end
end

file linked_list
break {line_number}
run
plist
continue
quit
"""

# Save the GDB script to a file
gdb_script_file = "gdb_script.txt"
with open(gdb_script_file, "w") as file:
    file.write(gdb_script)

# Run GDB with the script
command = f"gdb -x {gdb_script_file}"
output = subprocess.check_output(command, shell=True).decode("utf-8")

# Print the linked list output
print("Linked List:")
print(output)
