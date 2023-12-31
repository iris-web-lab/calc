navigator.serviceWorker && navigator.serviceWorker.register('/sw.js?ver=10').then(function (registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

let display = document.getElementById("display");
var errSetting = 0;
let counter = 0;
const version = 10;

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

function checkForUpdates() {
  console.log("Checking for updates 1/2");
  if ('serviceWorker' in navigator) {
    console.log("Checking for updates 2/2");
    navigator.serviceWorker.register('/sw.js?ver=9').then((registration) => {
        const storedVersion = localStorage.getItem('sw-version');
        if (storedVersion !== version) {
          console.log("Installing updates.");
          registration.update();
          localStorage.setItem('sw-version', version);
          console.log("Updates installed.");
        } else {
          console.log("No updates found.");
        }
      }).catch((error) => {
        console.error('Error installing update, Error registering service worker:', error);
      });
  }
}

setTimeout(checkForUpdates, 2000);
