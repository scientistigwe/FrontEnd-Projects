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

console.log(
  `Is raining & sunny: ${is_raining_and_sunny}; Is raining or sunny: ${is_raining_or_sunny}; Not raining: ${not_raining}`
);

//4. Variable Interactions
const name = "Kelvin";
const age = 32;
const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);

//Mixed Operations
const price = 19.99;
const quantity = 5;
const total_cost = price * quantity;
const completeSentence = `The total cost is $'${total_cost}}`;

console.log(completeSentence);

/** Control Flow **/
//1. Maximum of Two Numbers
//let first_num = prompt("Enter first number: ");
//let second_num = prompt("Enter second number: ");
if (first_num > second_num) {
  console.log(first_num);
} else {
  console.log(second_num);
}

//2. Factorial Calculation
//let pos_integer = parseInt(prompt("Enter positive integer: "));
let factorial = 1;

for (let i = pos_integer; i > 0; i--) {
  factorial *= i;
}
console.log(`The factorial of ${pos_integer} is ${factorial}`);

//3. Prime Number Checking
let pos_int = parseInt(prompt("Enter positive integer: "));
if (pos_int <= 1 || pos_int % 2 == 0 || pos_int % 3 == 0) {
  console.log(`${pos_int} is not a prime number.`);
} else {
  i = 5;
  while (i * i <= pos_int) {
    if (pos_int % i == 0 || pos_int % (i + 2) == 0) {
      console.log(`${pos_int} is not a prime number.`);
      break;
    }
    i += 6;
  }
  console.log(`${pos_int} is a prime number.`);
}

//4. Array Iteration
const arr = Array(
  12,
  [11, 10, 2],
  [{ name: "Jack", age: 129 }, ["verified", "unverified"], "121"]
);

for (i in arr) {
  console.log(i);
}
