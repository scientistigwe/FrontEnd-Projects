#Task Class using Linked List Data Structure
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