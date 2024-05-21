/**
 * A. Web Worker
 */
//1. Basic setup

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
