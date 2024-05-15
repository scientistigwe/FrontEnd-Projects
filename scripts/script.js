// Variables & Data Types
//1. Variable Declaration and Arithmetic Operations
const num1 = 10;
const num2 = 5;

const sum_result = num1 + num2;
const sub_result = num2 + num1;
const mul_result = num1 * num2;
const div_result = num1 / num2;

document.getElementById("sum_result").textContent = sum_result;
document.getElementById("sub_result").textContent = sub_result;
document.getElementById("mul_result").textContent = mul_result;
document.getElementById("div_result").textContent = div_result;

//2. String Manipulation
const str1 = "Hello";
const str2 = "World";

const concat_result = str1 + " " + str2;
const upper_str = str1.toUpperCase();
const str_length = str2.length;

document.getElementById("concat_result").textContent = concat_result;
document.getElementById("upper_str").textContent = upper_str;
document.getElementById("str_length").textContent = str_length;

//3. Boolean Operations
const is_raining = true;
console.log(is_raining);
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

//Mixed Operations
const price = 19.99;
const quantity = 5;
const total_cost = price * quantity;
const completeSentence = `The total cost is $'${total_cost}`;

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

  document.getElementById("max_num").textContent = max_num;
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

  document.getElementById("input_number").textContent = pos_integer;
  document.getElementById("factorial_result").textContent = factorial;
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
function arrFunction() {}
const arr = Array(
  12,
  [11, 10, 2],
  [{ name: "Jack", age: 129 }, ["verified", "unverified"], "121"]
);

for (i in arr) {
  console.log(i);
}
