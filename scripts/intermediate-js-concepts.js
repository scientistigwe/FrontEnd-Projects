/** Intermediate JavaScript Script **/
//A. Higher Order Functions

//1. Function as an argument (Callback functions)
function applyOperation(num1, num2, callback) {
  document.getElementById("introMessage").textContent =
    "Hey, I am a Higher Order Function and I will execute a callback function below!";
  callback(num1, num2);
}

function callbackFunc(num1, num2) {
  let task = parseInt(document.getElementById("task").value);
  let hofResult = "";

  if (task === 1) {
    hofResult = num1 + num2;
    document.getElementById("hofResult").textContent =
      "Addition of " + num1 + " & " + num2 + " is " + hofResult;
  } else if (task === 2) {
    hofResult = num1 - num2;
    document.getElementById("hofResult").textContent =
      "Subtraction of " + num2 + " from " + num1 + " is " + hofResult;
  } else if (task === 3) {
    hofResult = num1 * num2;
    document.getElementById("hofResult").textContent =
      "Product of " + num1 + " & " + num2 + " is " + hofResult;
  } else if (task === 4) {
    hofResult = num1 / num2;
    document.getElementById("hofResult").textContent =
      "Division of " + num1 + " By " + num2 + " is " + hofResult;
  } else {
    document.getElementById("invalidHofResult").textContent =
      "Please enter valid numbers and task";
  }
}

document.getElementById("hofResultBtn").addEventListener("click", function () {
  let num1 = parseFloat(document.getElementById("firstNum").value);
  let num2 = parseFloat(document.getElementById("secondNum").value);
  applyOperation(num1, num2, callbackFunc);
});
