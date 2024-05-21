/**
 * A. Web Worker
 */
//1. Basic setup & Message Passing

document.addEventListener("DOMContentLoaded", function () {
  if (window.Worker) {
    const myWorker = new Worker("worker.js"); //Instantiate new worker

    myWorker.onmessage = function (event) {
      document.getElementById(
        "myWorkerReceived"
      ).textContent = `New message received from worker: ${event.data}`;
    };

    const arr = [5, 10];
    myWorker.postMessage({ task: "createAndMessage", data: arr });
    document.getElementById(
      "myWorkerSent"
    ).textContent = `New message sent to worker: [${arr}]`;
  } else {
    document.getElementById(
      "errorMessage"
    ).textContent = `Window does not support worker`;
  }
});

//2. Data Processing Task
//Note: To access a csv file in your directory: 1. initialize node.js (npm init -y); 2. install csv-parser (npm install csv-parser)
document.getElementById("csvFile").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const csvData = event.target.result;

    processCSV(csvData);
  };
  reader.readAsText(file);
});

function processCSV(csvData) {
  if (window.Worker) {
    const myCSVWorker = new Worker("worker.js");

    myCSVWorker.postMessage({ task: "processCSV", data: csvData }); //send file to worker
    document.getElementById(
      "sendCSV"
    ).textContent = `CSV file sent to the CSV Web Worker successfully!`; //alert that message sent

    myCSVWorker.onmessage = function (event) {
      //receive result from worker
      const csvResult = event.data;
      document.getElementById(
        "csvResult"
      ).textContent = `Total Sales: ${csvResult} received from CSV Web Worker Successfully!`;
    };
  }
}
