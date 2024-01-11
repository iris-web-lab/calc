let display = document.getElementById("display");
var errSetting = 0;
let counter = 0;
const version = 11;

function errorSetting() {
  counter++;
  if (counter == 5) {
    errSetting = 1;
  }
}

setInterval(counter = 0, 5000);

function appendDisplay(char) {
  if (char == "Del") {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    if (display.textContent === "0") {
      display.textContent = char;
    } else {
      display.textContent += char;
    }
  }
}

function clearDisplay() {
  display.textContent = "0";
}

function evaluateDisplay() {
  try {
    //let result = eval(display.textContent);
    let result = new Function("return " + display.textContent);
    display.textContent = result();
  } catch (error) {
    if (errSetting == 0) {
      display.textContent = "Error";
    } else {
      display.textContent = error;
    }
  }
}
