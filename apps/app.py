from flask import Flask, render_template
from core_python import Task, ToDoList

app = Flask(__name__)

@app.route('/python/core-python')
def core_python():
    todo_list = ToDoList()

    task1 = Task("Buy groceries", 1, "2024-05-23")
    task2 = Task("Write report", 2, "2024-05-24")
    task3 = Task("Pay bills", 1, "2024-05-24")
    task4 = Task("Go for a walk", 3, "2024-05-26")
    task5 = Task("Clean the house", 4, "2024-05-27")
    task6 = Task("Prepare presentation", 1, "2024-05-23")

    todo_list.add_task(task1)
    todo_list.add_task(task2)
    todo_list.add_task(task3)
    todo_list.add_task(task4)
    todo_list.add_task(task5)
    todo_list.add_task(task6)

    add_task = todo_list.display_task()

    todo_list.remove_task("Go for a walk")
    remove_task = todo_list.display_task()

    todo_list.find_task("Pay bills")
    find_task = todo_list.display_task()

    todo_list.remove_task("I am an error task")
    error_task = todo_list.display_task()

    return render_template(
        'python/core-python.html',
        add_task=add_task,
        remove_task=remove_task,
        find_task=find_task,
        error_task=error_task
    )

if __name__ == '__main__':
    app.run(debug=True)
