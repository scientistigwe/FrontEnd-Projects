import subprocess

# Execute core_python.py and capture output
output = subprocess.check_output(['python', 'core_python.py'])

# Write captured output to a file
with open('output.txt', 'w') as f:
    f.write(output.decode('utf-8'))
