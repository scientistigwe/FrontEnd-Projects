/**
 * A. Web Worker
 */
//1. Basic setup & Message Passing

document.addEventListener("DOMContentLoaded", function () {
  if (window.Worker) {
    const myWorker = new Worker("../../scripts/worker.js"); //Instantiate new worker

    myWorker.onmessage = function (event) {
      document.getElementById(
        "myWorkerReceived"
      ).textContent = `New message (product of ${arr}) received from worker: ${event.data}`;
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
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("csvFile").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const csvData = event.target.result;

      if (window.Worker) {
        const myCSVWorker = new Worker("../../scripts/worker.js");

        myCSVWorker.postMessage({ task: "processCSV", data: csvData }); //send file to worker
        document.getElementById("sendCSV").textContent =
          "CSV file sent to the CSV Web Worker successfully!";

        myCSVWorker.onmessage = function (event) {
          //receive result from worker
          const { totalSales, maxQuantity, maxUnitPrice, error } = event.data;

          if (error) {
            document.getElementById("processCsvErrorMessage").textContent =
              error;
          } else {
            document.getElementById(
              "csvResultTotal"
            ).textContent = `Total Sales: ${totalSales}`;
            document.getElementById(
              "csvResultMaxQ"
            ).textContent = `Max Quantity: ${maxQuantity}`;
            document.getElementById(
              "csvResultMaxP"
            ).textContent = `Max Unit Price: ${maxUnitPrice}`;
          }
        };
      }
    };

    reader.readAsText(file);
  });
});
