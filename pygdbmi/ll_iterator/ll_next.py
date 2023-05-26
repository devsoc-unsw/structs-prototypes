from pygdbmi.gdbcontroller import GdbController
from pprint import pprint

gdbmi = GdbController()

# Compile the C program
gdbmi.write('-file-exec-and-symbols ll')

# Start GDB
gdbmi.write('-gdb-set new-console on')
gdbmi.write('-interpreter-exec console "target exec ll"')

# Set a breakpoint at line 27
gdbmi.write('-break-insert 21')

# Run the program
gdbmi.write('-exec-run')

# Select variable containing start of linked list
var = 'l1'

# Print l1.data
gdbmi.write(f'-var-create l1_data * {var}->data')
response = gdbmi.write('-var-evaluate-expression l1_data')

l1_data = response[0]['payload']['value']
print("l1.data =", l1_data)

# Print l1->next.data
gdbmi.write(f'-var-create l1_next_data * {var}->next->data')
response = gdbmi.write('-var-evaluate-expression l1_next_data')
l1_next_data = response[0]['payload']['value']
print("l1->next.data =", l1_next_data)

# Print l1->next->next.data
gdbmi.write(f'-var-create l1_next_next_data * {var}->next->next->data')
response = gdbmi.write('-var-evaluate-expression l1_next_next_data')
pprint(response)
l1_next_next_data = response[0]['payload']['value']
print("l1->next->next.data =", l1_next_next_data)

# Quit GDB
gdbmi.write('-gdb-exit')



