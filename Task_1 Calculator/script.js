const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
let records = [];
buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (item.id == "hist") {
      let result = history();
      display.innerText = result;
    } else if (display.innerText != "" && item.id == "equal") {
      const expression = display.innerText;
      const result = eval(expression);
      display.innerText = result;
      records.push({
        expression,
        result,
      });

      // Add the expression and result to the history array with a times
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "It's empty";
      setTimeout(() => (display.innerText = ""), 4000);
    } else {
      display.innerText += item.id;
    }
  };
});
function history() {
  try {
    if (records.length === 0) {
      return "EMPTY";
    } else {
      const lastRecord = records.pop();
      return `${lastRecord.expression} = ${lastRecord.result}`;
    }
  } catch (error) {
    return "ERROR";
  }
}
const themeToggleBtn = document.querySelector(".theme-toggle");
const calculator = document.querySelector(".calc");
const toggleIcon = document.querySelector(".toggle-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};
