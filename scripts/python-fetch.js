/*
document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the Flask route
  fetch("/apps/app")
    .then((response) => response.json())
    .then((data) => {
      // Assuming you have HTML elements with IDs corresponding to the data keys
      document.getElementById("initialState").textContent = data.initial_state;
      document.getElementById("updatedState").textContent = data.updated_state;
      document.getElementById("foundTaskDetails").textContent =
        data.found_task_details;
      document.getElementById("finalState").textContent = data.final_state;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
*/

// 3. Decorator function to automate workflow
// Fetch python file
function fetchPythonFile() {
  fetch("../../apps/output.txt")
    .then((Response) => Response.text())
    .then((data) => {
      document.getElementById("decorator-task").innerHTML = data + `<br>`;
    })
    .catch((error) => {
      console, log(`Error: ${error}`);
    });
}
fetchPythonFile();

document.addEventListener("DOMContentLoaded", fetchPythonFile);
