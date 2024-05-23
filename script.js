const display = document.getElementById("display");
const buttons = document.querySelectorAll(".append");
const buttonClear = document.getElementById("button-clear");
const buttonEqual = document.getElementById("button-equal");
let errSetting = 0;
let counter = 0;
const version = 14;

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

restoreText();

function restoreText() {
    const text = localStorage.getItem("text-content");
    display.textContent = text
}

window.onload = function(){
let observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        console.log(mutation.type); // <- It always detects changes
        localStorage.setItem("text-content", display.textContent);
    });    
});

let config = {characterData: true, subtree: true};
observer.observe(display, config);
//observer.disconnect();

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
