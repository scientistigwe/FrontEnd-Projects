//New web worker
self.onmessage = function (e) {
  console.log(`New message received from main thread ${e.data}`); //worker confirms task received

  const result = e.data[0] * e.data[1]; //worker computes the task

  self.postMessage(result); //worker sends result to main
};
