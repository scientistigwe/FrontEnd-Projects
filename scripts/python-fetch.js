function fetchAndRenderCorePython() {
  console.log("Fetching core Python data...");
  fetch("/app/core-python")
    .then((response) => {
      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Assuming the response is JSON data
    })
    .then((data) => {
      console.log("Data received:", data);
      // Update the content of each section in your core-python.html with the fetched data
      document.getElementById("initial-state").innerText = data.initial_state;
      document.getElementById("updated-state").innerText = data.updated_state;
      document.getElementById("found-task").innerText = data.found_task_details;
      document.getElementById("final-state").innerText = data.final_state;
    })
    .catch((error) => {
      console.error("Error fetching core Python data:", error);
    });
}

// Call fetchAndRenderCorePython function when the page loads
window.onload = fetchAndRenderCorePython;
