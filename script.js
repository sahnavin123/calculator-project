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
  if (operator === "") {
    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    if (firstNumber === "") {
      clearDisplay();
    } else {
      display.textContent = firstNumber;
    }
  } else {
    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    if (secondNumber === "") {
      operator = "";
      display.textContent = firstNumber;
    } else {
      display.textContent = secondNumber;
    }
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonValue = e.target.textContent;
    if (button.classList.contains("clear")) {
      clearDisplay();
    } else if (button.classList.contains("backspace")) {
      backspace();
    } else if (buttonValue >= "0" && buttonValue <= "9") {
      updateDisplay(buttonValue);
      if (operator === "") {
        firstNumber += buttonValue;
      } else {
        secondNumber += buttonValue;
      }
    } else if (buttonValue === ".") {
      if (!display.textContent.includes(".")) {
        updateDisplay(buttonValue);
        if (operator === "") {
          firstNumber += buttonValue;
        } else {
          secondNumber += buttonValue;
        }
      }
    } else if (buttonValue === "=") {
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
      }
    } else {
      operator = buttonValue;
      updateDisplay(buttonValue);
    }
  });
});
