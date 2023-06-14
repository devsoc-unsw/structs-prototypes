import subprocess

# Prompt user for variable name and line number
variable_name = input("Enter the variable name for the linked list: ")
line_number = input("Enter the line number to set a breakpoint: ")

# Specify the output file name
output_file = "ll_output.txt"

# Construct the GDB script
gdb_script = f"""
define plist
  set var $n = {variable_name}->head
  set logging file {output_file}
  set logging on
  while $n
    printf "Data: %d, Address: %p, Next: %p\\n", $n->data, $n, $n->next
    set var $n = $n->next
  end
  set logging off
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

# Print a success message
print(f"Linked list data stored in {output_file}")
