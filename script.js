const version = 15;
navigator.serviceWorker && navigator.serviceWorker.register('/sw.js?ver=' + version).then(function (registration) {
  console.log('Service worker registered with scope:', registration.scope);
});

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".append");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");
let errSetting = 0;
let counter = 0;

buttons.forEach(item => {
  let val = item.dataset.purpose;
  console.log("Loading: " + val);
  item.addEventListener('click', function(){
    appendDisplay(val)
  })
})

buttonClear.addEventListener('click', function(){
  clearDisplay()
})

buttonEqual.addEventListener('click', function(){
  evaluateDisplay(); 
  errorSetting();
})

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

function errorSetting() {
  counter++;
  if (counter == 5) {
    errSetting = 1;
  }
}

setInterval(counter = 0, 5000);

Window.onload = function size() {
  window.resizeTo(700, window.screen.availHeight / 2);
}

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
    //let result = new Function("return " + display.textContent);
    display.textContent = math.evaluate(display.textContent);
  } catch (error) {
    if (errSetting == 0) {
      display.textContent = "Error";
    } else {
      display.textContent = error;
    }
  }
}

function checkForUpdates() {
  console.log("Checking for updates 1/2");

  if ('serviceWorker' in navigator) {
    console.log("Checking for updates 2/2");

    navigator.serviceWorker.register('/sw.js?ver=' + version).then((registration) => {
      const storedVersion = localStorage.getItem('sw-version');

      if (storedVersion !== version) {
        console.log("Installing updates.");
        
        // Log the current and new version for debugging
        console.log('Current version:', storedVersion);
        console.log('New version:', version);

        registration.update().then(() => {
          localStorage.setItem('sw-version', version);
          console.log("Updates installed.");
        }).catch((updateError) => {
          console.error('Error installing update:', updateError);
        });
      } else {
        console.log("No updates found.");
      }
    }).catch((error) => {
      console.error('Error registering service worker:', error);
    });
  }
}

setTimeout(checkForUpdates, 2000);
