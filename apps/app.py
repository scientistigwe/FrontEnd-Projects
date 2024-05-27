# app.py
from flask import Flask, render_template,send_from_directory
from core_python import Task, ToDoList
import os
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__, static_folder='scripts/')

CORS(app)  # Enable CORS for all routes

# Get the directory path of the current file (app.py)
current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Set the template folder relative to the current file directory
template_folder = os.path.join(current_dir, 'templates')
app.template_folder = template_folder

@app.route('/python/core-python')
def core_python():
    todo_list = ToDoList()
    
    task1 = Task("Buy groceries", 1, "2024-05-23")
    task2 = Task("Write report", 2, "2024-05-24")
    task3 = Task("Pay bills", 1, "2024-05-25")
    task4 = Task("Prepare presentation", 3, "2024-05-26")
    task5 = Task("Record presentation", 3, "2024-05-26")

    todo_list.add_task(task1)
    todo_list.add_task(task2)
    todo_list.add_task(task3)
    todo_list.add_task(task5)
    
    initial_state = todo_list.display_task()

    todo_list.remove_task("Write report")
    updated_state = todo_list.display_task()

    found_task = todo_list.find_task("Pay bills")
    found_task_details = repr(found_task) if found_task else "Task not found"

    todo_list.add_task(task4)
    final_state = todo_list.display_task()

    return jsonify({
        'initial_state': initial_state,
        'updated_state': updated_state,
        'found_task_details': found_task_details,
        'final_state': final_state
    })

if __name__ == '__main__':
    app.run(debug=True)
