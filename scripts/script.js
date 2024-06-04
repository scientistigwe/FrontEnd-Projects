// Variables & Data Types
//1. Variable Declaration and Arithmetic Operations
const num1 = 10;
const num2 = 5;

document.addEventListener("DOMContentLoaded", function () {
  const sum_result = num1 + num2;
  const sub_result = num2 + num1;
  const mul_result = num1 * num2;
  const div_result = num1 / num2;

  document.getElementById("sum_result").textContent = `Addition: ${sum_result}`;
  document.getElementById(
    "sub_result"
  ).textContent = `Subtraction: ${sub_result}`;
  document.getElementById(
    "mul_result"
  ).textContent = `Multiplication: ${mul_result}`;
  document.getElementById("div_result").textContent = `Division: ${div_result}`;
});

//2. String Manipulation
const str1 = "Hello";
const str2 = "World";

const concat_result = `${str1}  ${str2}`;
const upper_str = str1.toUpperCase();
const str_length = str2.length;

document.getElementById("concat_result").textContent = concat_result;
document.getElementById("upper_str").textContent = upper_str;
document.getElementById("str_length").textContent = str_length;

//3. Boolean Operations
const is_raining = true;
const is_sunny = false;
let is_raining_and_sunny = is_raining && is_sunny;
let is_raining_or_sunny = is_raining || !is_sunny;
let not_raining = !is_raining;

document.getElementById("is_raining_and_sunny").textContent =
  is_raining_and_sunny;
document.getElementById("is_raining_or_sunny").textContent =
  is_raining_or_sunny;
document.getElementById("not_raining").textContent = not_raining;

//4. Variable Interactions
const name = "Kelvin";
const age = 32;
const message = `My name is ${name} and I am ${age} years old.`;

document.getElementById("message").textContent = message;

//5. Mixed Operations
const price = 19.99;
const quantity = 5;
const total_cost = price * quantity;
const completeSentence = `The total cost is $ ${Math.floor(total_cost)}`;

document.getElementById("completeSentence").textContent = completeSentence;

/** Control Flow **/
//1. Maximum of Two Numbers
function pickMaxNum() {
  let first_num = parseFloat(document.getElementById("first_num_input").value);
  let second_num = parseFloat(
    document.getElementById("second_num_input").value
  );

  if (isNaN(first_num) || isNaN(second_num)) {
    document.getElementById("max_num").textContent =
      "Please enter valid number.";
    return;
  }
  let max_num = Math.max(first_num, second_num);

  document.getElementById(
    "max_num"
  ).textContent = `The max number between ${first_num} and ${second_num} is ${max_num}`;
}
document.getElementById("max_num_btn").addEventListener("click", pickMaxNum);

//2. Factorial Calculation
function calFactorial() {
  let pos_integer = parseInt(document.getElementById("factorial_number").value);

  if (isNaN(pos_integer)) {
    document.getElementById("invalid_num").textContent =
      "Please enter valid number.";
    return;
  }

  let factorial = 1;

  for (let i = pos_integer; i > 0; i--) {
    factorial *= i;
  }

  document.getElementById(
    "input_number"
  ).textContent = `The factorial of ${pos_integer} is ${factorial}`;
}

document
  .getElementById("factorial_number_btn")
  .addEventListener("click", calFactorial);

//3. Prime Number Checking
function IsPrime() {
  let pos_int = parseInt(document.getElementById("prime_number").value);

  //Validity Check
  if (isNaN(pos_int) || pos_int < 2) {
    document.getElementById("invalid_prime_number").textContent =
      "Please enter a valid number greater than 1";
    return;
  }
  let isPrime = true;

  for (i = 2; i <= Math.sqrt(pos_int); i++) {
    if (pos_int % i == 0) {
      isPrime = false;
      break;
    }
  }
  document.getElementById("entered_number").textContent = pos_int;
  document.getElementById("is_prime").textContent = isPrime
    ? "is a prime number."
    : "is not a prime number.";
}
document.getElementById("is_prime_btn").addEventListener("click", IsPrime);

//4. Array Iteration
let arrayElements = Array(
  12,
  [11, 10, 2],
  [{ name: "Jack", age: 129 }, ["verified", "unverified"], "121"]
);

document.getElementById("arrayInput").textContent =
  "Array: [" + arrayElements + "]";

let output = "";
for (let i = 0; i < arrayElements.length; i++) {
  output += arrayElements[i] + ", ";
}
document.getElementById("array_elements").textContent =
  "Array Elements: " + output.slice(0, -2);

//5. IF-ELSE loop Example
function displayValue() {
  let value = document.getElementById("user_value").value.trim();

  // Exit condition
  if (value.toLowerCase() === "exit") {
    document.getElementById("invalid_user_value").textContent = "Exiting...";
    return; // Stop further execution
  }

  // Validation check
  if (value.length === 0) {
    document.getElementById("invalid_user_value").textContent =
      "Please enter a valid value";
  } else {
    document.getElementById("entered_value").textContent =
      "You entered: " + value;
    document.getElementById("invalid_user_value").textContent = "";
    document.getElementById("invalid_user_value").textContent =
      "Please enter another value to continue or enter 'exit'";
  }
}

document
  .getElementById("user_value_btn")
  .addEventListener("click", displayValue);

/**  Part C: Functions:  **/
//Function definition and Usage
(function calculateArea(length, width) {
  let area = length * width;
  document.getElementById("areaOfRectangle").textContent =
    "Area of the rectangle is: " + area;
})(5, 8);

//2. Scope Understanding
let globalVar =
  "I am a global variable but I was accessed inside a local variable.";
(function testScope() {
  let localVar =
    "I am a local variable and I can only be accessed inside my function.";

  document.getElementById("globalVar").textContent = globalVar;
  document.getElementById("localVar").textContent = localVar;
})();

//3. Parameter Usage
(function calculateInterest(principal, rate, time) {
  let simpleInterest = (principal * rate * time) / 100;
  document.getElementById("calculateInterest").textContent =
    "Simple Interest: " + simpleInterest;
})(1000, 5, 2);

//4. Return Values
(function findMax(arr) {
  let maxElement = arr[0];

  arr.forEach((element) => {
    if (maxElement < element) {
      maxElement = element;
    }
  });
  document.getElementById(
    "findMax"
  ).textContent = `Max Element in ${arr} is ${maxElement}`;
})([10, 25, 8, 30, 15]);

//5. Function Composition
function addFunc(num1, num2) {
  let addNumber = num1 + num2;
  document.getElementById(
    "addMultiplyResult"
  ).textContent = `Addition of ${num1} and ${num2} is ${addNumber}`;
}

function multplierFunc(num1, num2) {
  let multiplierNumber = num1 * num2;
  document.getElementById("addMultiplyResult").textContent =
    "Product of " + num1 + " & " + num2 + " is " + multiplierNumber;
}

document.getElementById("addAndMultBtn").addEventListener("click", function () {
  let num1 = parseFloat(document.getElementById("userInputNumber1").value);
  let num2 = parseFloat(document.getElementById("userInputNumber2").value);
  let actionType = parseFloat(document.getElementById("actionType").value);

  if (actionType === 1) {
    addFunc(num1, num2);
  } else if (actionType === 2) {
    multplierFunc(num1, num2);
  } else {
    document.getElementById("invalidAddMultiplyResult").textContent =
      "Please enter valid action type";
  }
});

/**
 * Part D: Arrays and Objects
 */
// 1. Array CRUD Operations
document.addEventListener("DOMContentLoaded", () => {
  let myArray = Array(); // Initialize an empty array
  document.getElementById(
    "initializedArray"
  ).textContent = `Initialized Array is: [${myArray}]`;

  myArray.push(10, 20, 30); // Add elements to the array
  document.getElementById(
    "myArray"
  ).textContent = `Array after adding elements: [${myArray}]`;

  myArray[1] = 25; // Update the second element in the array
  document.getElementById(
    "secondElementAlteredArray"
  ).textContent = `Array after updating second element: [${myArray}]`;

  myArray.pop(); // Remove the last element from the array
  document.getElementById(
    "lastElementRemovedArray"
  ).textContent = `Array after removing last element: [${myArray}]`;
});

//2. Object CRUD Operations
const objectCrudId = document.getElementById("object-crud-operations");
const objectCrudUpdateId = document.getElementById("object-crud-update");
const finalContent = document.getElementById("final-content");
let myObject;

document.addEventListener("DOMContentLoaded", function () {
  myObject = {
    Name: ["Kevin", "Martin", "Iris", "David"],
    Age: [30, 25, 27, 33],
    City: ["London", "Scotland", "Dublin", "Wales"],
  };
  objectCrudId.textContent = `myObject Initialized: ${JSON.stringify(
    myObject
  )}`;

  myObject.Age[0] = 28;
  objectCrudUpdateId.textContent = `myObject updated: ${JSON.stringify(
    myObject
  )}`;

  delete myObject.City;
  finalContent.textContent = `myObject 'City Key' Removed: ${JSON.stringify(
    myObject
  )}`;
});

// 3. Array Iteration
const arrayLoop = document.getElementById("array-loop");
let fruitList = "";
document.addEventListener("DOMContentLoaded", function () {
  let fruitArray = { fruits: ["apple", "banana", "orange", "grape", "kiwi"] };
  fruitArray.fruits.forEach((fruit) => {
    fruitList += `${fruit}<br>`;
  });
  arrayLoop.innerHTML = fruitList;
});

//4. Object Iteration
const objLoop = document.getElementById("object-loop");
let person = "";
let personList = "";
document.addEventListener("DOMContentLoaded", function () {
  person = {
    name: ["Diana", "Charlie", "Sefi", "Noora", "Stuart"],
    age: [25, 27, 32, 23, 25],
    gender: ["female", "female", "Male", "female", "Male"],
  };
  for (let i = 0; i < person.name.length; i++) {
    personList += `Name: ${person.name[i]}, Age: ${person.age[i]}, Gender: ${person.gender[i]}<br>`;
  }
  objLoop.innerHTML = personList;
});

// 5. Array & Object Combination
const arrObjCombination = document.getElementById("arr-obj-combination");
let students;
let studentList = "";

document.addEventListener("DOMContentLoaded", () => {
  students = [
    { name: "Frank", age: "32", grade: "89" },
    { name: "Prince", age: "29", grade: "79" },
    { name: "Tony", age: "42", grade: "82" },
    { name: "Mike", age: "39", grade: "56" },
  ];

  students.forEach((student) => {
    studentList += `Name: ${student.name}; Age: ${student.age}; Grade: ${student.grade}<br>`;
  });
  arrObjCombination.innerHTML = studentList;
});

/**
 * ERROR HANDLING
 */
/* Task 1: File Read Error */
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed"); // To check if the script is running

  const readFile = document.getElementById("read-file");
  const catchError = document.getElementById("catch-error");

  if (!readFile || !catchError) {
    console.error("Required DOM elements not found");
    return;
  }

  console.log("Fetching non-existent file..."); // To check if fetch is attempted
  readFile.innerHTML = "Fetching non-existent file..."; // To check if fetch is attempted

  fetch("non-existent-file.txt")
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText); // To log the error response
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      readFile.innerHTML = `Reading file: ${data}`;
      console.log("File content:", data); // To log the file content if successful
    })
    .catch((error) => {
      catchError.innerHTML = `Error occurred while reading the file: ${error.message}`;
      console.error("Fetch error:", error.message); // To log the fetch error
    });
});
