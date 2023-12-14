navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function (registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

let display = document.getElementById("display");

Window.onload = function size() {
  window.resizeTo(700, window.screen.availHeight / 2);
}

function appendDisplay(char) {
  if (display.textContent === "0") {
    display.textContent = char;
  } else {
    if (char == "Del") {
      display.textContent = display.textContent.slice(0, -1);
    } else {
      display.textContent += char;
    }
  }
}

/*  Window.onload = function service() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }
} */

function clearDisplay() {
  display.textContent = "0";
}

function evaluateDisplay() {
  try {
    let result = eval(display.textContent);
    display.textContent = result;
  } catch (error) {
    display.textContent = "Error";
  }
}
