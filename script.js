const display = document.getElementById("display");
const buttons = document.querySelectorAll(".append");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");
let browser = (window.browser)? window.browser : window.chrome;
let errSetting = 0;
let counter = 0;
const version = 14;

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
