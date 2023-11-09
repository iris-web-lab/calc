    let display = document.getElementById("display");

    function appendDisplay(char) {
      if (display.textContent === "0") {
        display.textContent = char;
      } else {
        display.textContent += char;
      }
    }

    Window.onload = function {
   if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
   }
    }

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
