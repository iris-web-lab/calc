    let display = document.getElementById("display");

    function appendDisplay(char) {
      if (display.textContent === "0") {
        display.textContent = char;
      } else {
        display.textContent += char;
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
