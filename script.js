let num_1 = 0;
let num_2 = 0;
let maxNum = 999999999;
let operator = null;
let resultDiv = document.querySelector(".results");

function add() {
  return +num_1 + +num_2;
}

function subtract() {
  return +num_1 - +num_2;
}

function multiply() {
  return +num_1 * +num_2;
}

function divide() {
  return +num_1 / +num_2;
}

function operate(operator) {
  if (operator == "+") return add();
  if (operator == "-") return subtract();
  if (operator == "*") return multiply();
  if (operator == "/") return divide();
}

function results(value) {
  resultDiv.innerText = value;
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
  if (value.match(/=/g)) return (resultDiv.innerText = calculate_results());

  if (value.match(/\W/g)) {
    if (operator != null) resultDiv.innerText = calculate_results();
    else resultDiv.innerText = value;

    return (operator = value);
  }

  if (+resultDiv.innerHTML > maxNum) return;

  if (operator == null && num_1 == 0) num_1 = value;
  else if (operator != null && num_2 == 0) num_2 = value;
  else if (operator != null) num_2 += value;
  else num_1 += value;

  resultDiv.innerText = operator != null ? num_2 : num_1;
}

function calculate_results() {
  if (num_2 == 0) return num_1;
  let oP = operator;
  let n1 = num_1;
  let n2 = num_2;

  operator = null;
  num_1 = operate(oP, n1, n2);
  num_2 = 0;

  if (num_1 > maxNum) {
    reset();
    return "To large!";
  }
  return num_1;
}

function reset() {
  num_1 = 0;
  num_2 = 0;
  operator = null;

  resultDiv.innerText = 0;
}

function percentage() {
  if (operator == null) num_1 = num_1 / 100;
  else num_2 = num_2 / 100;

  resultDiv.innerText = operator == null ? num_1 : num_2;
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

  resultDiv.innerText = operator == null ? num_1 : num_2;
}

function addDot() {
  if (resultDiv.innerText.includes(".")) return;
  resultDiv.innerText = operator == null ? (num_1 += ".") : (num_2 += ".");
}

document.getElementById("=").addEventListener("click", operate());

document.addEventListener("keyup", (key) => {
  let acceptableValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "/",
    "*",
    "-",
    "+",
    "=",
    "%",
    "Backspace",
  ];
  if (!acceptableValues.includes(key.key)) return;
  if (key.key == "Backspace") return removeLastNumber();

  let button = document.getElementById(key.key);

  button.classList.add("butColor");
  setTimeout(() => {
    button.classList.remove("butColor");
  }, 100);

  button.click();
});

function removeLastNumber() {
  operator == null
    ? (num_1 = num_1.toString().slice(0, -1))
    : (num_2 = num_2.toString().slice(0, -1));

  document.querySelector(".results").innerText =
    operator == null ? num_1 : num_2;
}
