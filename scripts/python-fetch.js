// ToDo List Function
function fetchToDoListPythonFile() {
  fetch("../../apps/linked_list_output.txt")
    .then((Response) => Response.text())
    .then((data) => {
      document.getElementById("todo_list").innerHTML = data;
    })
    .catch((error) => {
      console, log(`Error: ${error}`);
    });
}
fetchToDoListPythonFile();

document.addEventListener("DOMContentLoaded", fetchToDoListPythonFile);

// 3. Decorator function to automate workflow
// Fetch python file
function fetchDecoratorPythonFile() {
  fetch("../../apps/decorator_output.txt")
    .then((Response) => Response.text())
    .then((data) => {
      document.getElementById("decorator-task").innerHTML = data + `<br>`;
    })
    .catch((error) => {
      console, log(`Error: ${error}`);
    });
}
fetchDecoratorPythonFile();

document.addEventListener("DOMContentLoaded", fetchPythonFile);
