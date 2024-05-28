import argparse

#2. Task Class using Linked List Data Structure
class Task:
    def __init__(self, description, priority, due_date):
        self.description = description
        self.priority = priority
        self.due_date = due_date

    def __repr__(self):
        return f"Task(description='{self.description}', priority={self.priority}, due_date='{self.due_date}')"

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
    
    def __repr__(self):
        return repr(self.data)
    

class ToDoList:
    def __init__(self):
        self.head = None
    
    def add_task(self, task):
        new_node = Node(task)
        if self.head is None:
            self.head = new_node
        
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def remove_task(self, description):
        if self.head is None:
            return f"Task(description = '{description}') does not exist"
        
        if self.head.data.description == description:
            self.head = self.head.next

        current = self.head
        while current.next:
            if current.next.data.description == description:
                current.next = current.next.next
            current = current.next
    
    def find_task(self, description):
        current = self.head
        while current:
            if current.data.description == description:
                return current.data
            current = current.next
        return None
    
    def display_task(self):
        tasks = []
        current = self.head
        while current:
            tasks.append(repr(current.data))
            current = current.next
        return '\n'.join(tasks)
    
    def __repr__(self):
        return self.display_task()
    

# 3. Decorator Function to automate WorkFlow
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from functools import wraps

class TaskOrder:
    def __init__(self, order):
        self.order = order
        self.current_position = 0

    def next_task(self, task_name):
        if self.order[self.current_position] == task_name:
            self.current_position += 1
            return True
        else:
            return False

def enforce_order(task_order):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(f"Attempting to run {func.__name__}...")
            if task_order.next_task(func.__name__):
                result = func(*args, **kwargs)
                print(f"Completed {func.__name__}")
                return result
            else:
                raise Exception(f"Error: {func.__name__} is not the next task to be executed.")
        return wrapper
    return decorator

# Define the desired task order
desired_task = ['fetch_data', 'process_data', 'analyze_data', 'visualize_data', 'store_data']
task_order = TaskOrder(desired_task)

# Task 1: Fetch Data
@enforce_order(task_order)
def fetch_data():
    csv_path = '../dataset/supermarket_sales.csv'
    dataframe = pd.read_csv(csv_path)
    return dataframe

# Task 2: Process Data
@enforce_order(task_order)
def process_data(dataframe):
    processed_data = dataframe.drop_duplicates()
    return processed_data

# Task 3: Analyze Data
@enforce_order(task_order)
def analyze_data(processed_data):
    # Analyze the processed data to identify trends
    analysis_result = processed_data[['cogs', 'gross margin percentage', 'gross income']].corr()
    return analysis_result

# Task 4: Visualize Data
@enforce_order(task_order)
def visualize_data(analysis_result):
    # Visualize the analyzed data (e.g., generate charts)
    # Example: Save the analysis result as a simple visualization
    plt.figure()
    plt.imshow(analysis_result, cmap='viridis', interpolation='nearest')
    plt.colorbar()
    plt.savefig('../dataset/analysis_visualization.png')
    plt.close()
    return analysis_result


# Task 5: Store Data
@enforce_order(task_order)
def store_data(visualization_result):
    # Store the processed and visualized data
    visualization_result.to_csv('../dataset/processed_data.csv')
    print('Data stored successfully')
    return "Data stored successfully"

# Define a main function to parse command-line arguments and execute the appropriate task
def main():
    parser = argparse.ArgumentParser(description='Execute tasks in core_python.py')
    parser.add_argument('--task', type=str, choices=['linked_list', 'decorator'], help='Specify the task to execute')
    args = parser.parse_args()

    if args.task == 'linked_list':
        #Linked list task
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

        print(f"<strong>Initial State:</strong> {initial_state}<br><br> <strong>Updated State:</strong> {updated_state}<br><br> <strong>Found Task Details:</strong> {found_task_details}<br><br> <strong>Final State:</strong> {final_state}")
    elif args.task == 'decorator':
        #Decoratortask
        dataframe = fetch_data()
        processed_data = process_data(dataframe)
        analysis_result = analyze_data(processed_data)
        visualize_data(analysis_result)
        store_data(analysis_result)

# Call the main function to execute the script
if __name__ == "__main__":
    main()
