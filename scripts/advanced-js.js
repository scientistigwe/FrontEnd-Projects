/**
 * A. Web Worker
 */
//1. Basic setup & Message Passing

if (window.Worker) {
  const myWorker = new Worker("worker.js"); //Instantiate new worker

  myWorker.onmessage = function (e) {
    document.getElementById(
      "myWorkerReceived"
    ).textContent = `New message received from worker: ${e.data}`;
  };

  arr = [5, 10];
  myWorker.postMessage(arr);
  document.getElementById(
    "myWorkerSent"
  ).textContent = `New message sent to worker: [${arr}]`;
} else {
  document.getElementById(
    "errorMessage"
  ).textContent = `Window does not support worker`;
}

//2. Data Processing Task
//Note: To access a csv file in your directory: 1. initialize node.js (npm init -y); 2. install csv-parser (npm install csv-parser)
