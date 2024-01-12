const display = document.getElementById("display");
const buttons = document.querySelectorAll(".append");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");
let errSetting = 0;
let counter = 0;
const version = 13;

buttons.forEach(item => {
  let val = item.dataset.purpose;
  console.log("Loading: " + val);
  item.addEventListener('click', function () {
    appendDisplay(val)
  })
})

buttonClear.addEventListener('click', function () {
  clearDisplay()
})

buttonEqual.addEventListener('click', function () {
  evaluateDisplay();
  errorSetting();
})

function errorSetting() {
  counter++;
  if (counter == 5) {
    errSetting = 1;
  }
}

function resetCounter() {
  setTimeout(function () {
    counter = 0;
    resetCounter()
  }, 5000);
}

resetCounter();

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
