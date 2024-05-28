import subprocess
# 1. Task: Task Class using Linked List Data Structure
linked_list_output = subprocess.check_output(['python', 'core_python.py', '--task', 'linked_list'])

# Write captured output to a file
with open('linked_list_output.txt', 'w') as f:
    f.write(linked_list_output.decode('utf-8'))


# 2. Task: Decorator Function to automate WorkFlow
decorator_output = subprocess.check_output(['python', 'core_python.py', '--task', 'decorator'])

# Write captured output to a file
with open('decorator_output.txt', 'w') as f:
    f.write(decorator_output.decode('utf-8'))
