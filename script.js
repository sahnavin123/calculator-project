const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Cannot divide by zero!";
      } else {
        return a / b;
      }
  }
};

const clearDisplay = () => {
  display.textContent = "0";
  firstNumber = "";
  operator = "";
  secondNumber = "";
  result = "";
};

const updateDisplay = (value) => {
  if (display.textContent === "0" || result !== "") {
    display.textContent = value;
    result = "";
  } else {
    display.textContent += value;
  }
};

const backspace = () => {
  switch (true) {
    case secondNumber !== "":
      secondNumber = secondNumber.slice(0, -1);
      break;
    case operator !== "":
      operator = "";
      display.textContent = firstNumber;
      break;
    case firstNumber !== "":
      firstNumber = firstNumber.slice(0, -1);
      break;
    default:
      display.textContent = "0";
      break;
  }

  display.textContent =
    firstNumber === "" && operator === "" && secondNumber === ""
      ? "0"
      : `${firstNumber}${operator}${secondNumber}`;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.textContent;

    switch (true) {
      case button.classList.contains("clear"):
        clearDisplay();
        break;
      case button.classList.contains("backspace"):
        backspace();
        break;
      case isNumericButton(buttonValue):
        handleNumericButton(buttonValue);
        break;
      case buttonValue === ".":
        handleDecimalButton();
        break;
      case buttonValue === "=":
        handleEqualsButton();
        break;
      case isOperatorButton(buttonValue):
        handleOperatorButton(buttonValue);
        break;
    }
  });
});

const isNumericButton = (buttonValue) => {
  return buttonValue >= "0" && buttonValue <= "9";
};

const isOperatorButton = (buttonValue) => {
  return (
    buttonValue === "+" ||
    buttonValue === "-" ||
    buttonValue === "*" ||
    buttonValue === "/"
  );
};

const handleNumericButton = (buttonValue) => {
  updateDisplay(buttonValue);

  operator === ""
    ? (firstNumber += buttonValue)
    : (secondNumber += buttonValue);

  display.textContent = `${firstNumber}${operator}${secondNumber}`;
};

const handleDecimalButton = () => {
  if (!display.textContent.includes(".")) {
    updateDisplay(".");

    operator === "" ? (firstNumber += ".") : (secondNumber += ".");

    display.textContent = `${firstNumber}${operator}${secondNumber}`;
  }
};

const handleEqualsButton = () => {
  if (operator !== "" && secondNumber !== "") {
    result = operate(
      operator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    );
    display.textContent = result;
    firstNumber = result.toString();
    operator = "";
    secondNumber = "";
    result = "";
  }
};

const handleOperatorButton = (buttonValue) => {
  if (firstNumber === "") {
    display.textContent = "Error: Write number before digits!";
    return;
  }

  operator !== ""
    ? ((display.textContent = `${firstNumber}${buttonValue}${secondNumber}`),
      (operator = buttonValue))
    : ((operator = buttonValue), updateDisplay(buttonValue));
};
