var displayValue = 42123190;

let currentDisplay = document.getElementById('calcDisplay');
let parentOfDisplay = document.querySelector('#topSide');

currentDisplay.textContent = displayValue;
// 
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function clearAll() {

    displayValue = 0;
    currentDisplay.textContent = displayValue;

    // currentDisplay.remove();
    // //newDisplay.remove();

    // let newDisplay = document.createElement('div');
    // newDisplay.setAttribute("id", "calcDisplay");
    // parentOfDisplay.appendChild(newDisplay);
    
    // displayValue = 0;
    // newDisplay.textContent = displayValue;

}

function removeDigit () {
    
    let digitArray = Array.from(displayValue.toString()).map(Number);

    if (digitArray.length === 1){
        digitArray.splice(0, 1, "0");
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    } else if (digitArray.length > 1) {
        digitArray.splice(digitArray.length - 1, 1);
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    }
   
}

let clear = document.getElementById('clear');
let backspace = document.getElementById('backspace');

clear.addEventListener('click', () => {
    clearAll();
});

backspace.addEventListener('click', () => {
    removeDigit();
});

// const buttonArray = Array.from(document.querySelectorAll('.calcButton'));

// buttonArray.forEach(buttonElement => {
//     buttonElement.addEventListener('click', function(e){ 
//         removeExistingDisplay();
//     })
// });




