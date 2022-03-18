let num_1 = 0;
let num_2 = 0;
let maxNum = 999999;
let operator = null;

function add(num_1, num_2) {
  return +num_1 + +num_2;
}

function subtract(num_1, num_2) {
  return +num_1 - +num_2;
}

function multiply(num_1, num_2) {
  return +num_1 * +num_2;
}

function divide(num_1, num_2) {
  return +num_1 / +num_2;
}

function operate(operator, num_1, num_2) {
  if (operator == "+") return add(num_1, num_2);
  if (operator == "-") return subtract(num_1, num_2);
  if (operator == "*") return multiply(num_1, num_2);
  if (operator == "/") return divide(num_1, num_2);
}

function results(value) {
  document.querySelector(".results").innerText = value;
}

const buttons = [...document.getElementsByTagName("button")];
buttons.forEach((but) => {
  but.addEventListener("click", (event) => {
    if (event.target.id == "ac") return reset();
    if (event.target.id == "%") return percentage();
    if (event.target.id == "+/-") return negativeNumber();
    if (event.target.id == ".") return addDot();
    return storeValues(event.target.id);
  });
});

function storeValues(value) {
  if (value.match(/=/g))
    return (document.querySelector(".results").innerText = calculate_results());

  if (value.match(/\W/g)) {
    if (operator != null)
      document.querySelector(".results").innerText = calculate_results();
    return (operator = value);
  }

  if (operator == null && num_1 == 0) num_1 = value;
  else if (operator != null && num_2 == 0) num_2 = value;
  else if (operator != null) num_2 += value;
  else num_1 += value;

  document.querySelector(".results").innerText =
    operator != null ? num_2 : num_1;
}

function calculate_results() {
  let oP = operator;
  let n1 = num_1;
  let n2 = num_2;

  operator = null;
  num_1 = operate(oP, n1, n2);
  num_2 = 0;

  return clamp(num_1, 0, maxNum);
}

function reset() {
  num_1 = 0;
  num_2 = 0;
  operator = null;

  document.querySelector(".results").innerText = 0;
}

function percentage() {
  if (operator == null) num_1 = num_1 / 100;
  else num_2 = num_2 / 100;

  document.querySelector(".results").innerText =
    operator == null ? num_1 : num_2;
}

function negativeNumber() {
  if (operator == null)
    num_1 = num_1.toString().includes("-")
      ? Math.abs(+num_1)
      : -Math.abs(+num_1);
  else
    num_2 = num_2.toString().includes("-")
      ? Math.abs(+num_2)
      : -Math.abs(+num_2);

  document.querySelector(".results").innerText =
    operator == null ? num_1 : num_2;
}

function addDot() {
  document.querySelector(".results").innerText =
    operator == null ? (num_1 += ".") : (num_2 += ".");
}

document.getElementById("=").addEventListener("click", operate());
