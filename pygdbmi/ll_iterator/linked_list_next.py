from pygdbmi.gdbcontroller import GdbController
from pprint import pprint

gdbmi = GdbController()

# Compile the C program
gdbmi.write('-file-exec-and-symbols linked_list')

# Start GDB
gdbmi.write('-gdb-set new-console on')
gdbmi.write('-interpreter-exec console "target exec linked_list"')

# Set a breakpoint at line 27
gdbmi.write('-break-insert 51')

# Run the program
gdbmi.write('-exec-run')

# Select variable containing start of linked list
var = 'list'

# Print list->head->data
gdbmi.write(f'-var-create head_data * {var}->head->data')
response = gdbmi.write('-var-evaluate-expression head_data')
l_head_data = response[0]['payload']['value']
print("list_data =", l_head_data)

# Print list->head->next->data
gdbmi.write(f'-var-create head_next_data * {var}->head->next->data')
response = gdbmi.write('-var-evaluate-expression head_next_data')
l_head_next_data = response[0]['payload']['value']
print("l1->next.data =", l_head_next_data)

# Print list->head->next->next->data
gdbmi.write(f'-var-create head_next2_data * {var}->head->next->next->data')
response = gdbmi.write('-var-evaluate-expression head_next2_data')
l_head_next2_data = response[0]['payload']['value']
print("l1->next.data =", l_head_next2_data)



# Quit GDB
gdbmi.write('-gdb-exit')



