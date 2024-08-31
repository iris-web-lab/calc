const display = document.getElementById("display");
const buttons = document.querySelectorAll(".append");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");
let browser = (window.browser)? window.browser : window.chrome;
let errSetting = 0;
let counter = 0;
const version = 16;

buttons.forEach((item) => {
  let val = item.dataset.purpose;
  console.log("Loading: " + val);
  item.addEventListener("click", function () {
    appendDisplay(val);
  });
});

buttonClear.addEventListener("click", function () {
  clearDisplay();
});

buttonEqual.addEventListener("click", function () {
  evaluateDisplay();
  errorSetting();
});

document.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  let val = null;
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      val = event.key;
      break;
    case "/":
    case "*":
    case "+":
    case "-":
    case "(":
    case ")":
    case ".":
      val = event.key;
      break;
    case "Enter":
      val = "=";
      break;
    case "=":
      val = "=";
      break;
    case "Backspace":
      val = "Del";
      break;
    case "Escape":
      val = "C";
      break;
    case "C":
      val = "C";
      break;
    case "c":
      val = "C";
      break;
    default:
      return; // Do not act on other keys
  }

  console.log("Keypress detected: " + val);
  if (val === "C") {
    clearDisplay();
  } else if (val === "=") {
    evaluateDisplay();
  } else {
    appendDisplay(val);
  }
  event.preventDefault();
});

restoreText();

function restoreText() {
  console.log("Restoring text...");
  chrome.storage.local.get(["textDisplay"]).then((result) => {
    console.log("Value is ", result.textDisplay);
    display.textContent = result.textDisplay;
  });
}

function saveText() {
  console.log("Saving text:", display.textContent);

  try {
    chrome.storage.local.set({ textDisplay: display.textContent });
  } catch (error) {
    console.log("Error saving text:", error);
  }
}

function errorSetting() {
  counter++;
  if (counter == 5) {
    errSetting = 1;
  }
}

function resetCounter() {
  setTimeout(function () {
    counter = 0;
    resetCounter();
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
  saveText();
}

function clearDisplay() {
  display.textContent = "0";
  saveText();
}

function evaluateDisplay() {
  try {
    //let result = eval(display.textContent);
    //let result = new Function("return " + display.textContent);
    display.textContent = math.evaluate(display.textContent);
  } catch (error) {
    if (errSetting == 0) {
      display.textContent = "Error";
    } else {
      display.textContent = error;
    }
  }
  saveText();
}
