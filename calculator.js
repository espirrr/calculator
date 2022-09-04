var displayValue = 0;
var resultNumber = [];
var firstNumberStored = [];
var secondNumberStored = [];
var firstStoredOperator;
var secondStoredOperator;
var sameEquationCount = 0;

let currentDisplay = document.getElementById('calcDisplay');
let parentOfDisplay = document.querySelector('#topSide');
let actionDisplay = document.getElementById('calcNotes');

currentDisplay.textContent = displayValue;
actionDisplay.textContent = "Click to use Calculator";

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide (a, b) {
    return parseInt(a) / parseInt(b);
}

function operate(operator, a, b) {
 
    if (secondStoredOperator && secondNumberStored && resultNumber.length > 0) {
        firstStoredOperator = secondStoredOperator;
    } 

    if (firstStoredOperator === "+") {
        resultNumber.push(add(a, b));
    } else if (firstStoredOperator === "-") {
        resultNumber.push(subtract(a, b));
    } else if (firstStoredOperator === "x") {
        resultNumber.push(multiply(a, b));
    } else if (firstStoredOperator === "÷") {
        resultNumber.push(divide(a, b));
    } 

    displayValue = resultNumber.join();
    displayValue = parseFloat(displayValue).toFixed(2);

    firstNumberStored.shift();
    firstNumberStored.push(displayValue);
    updateDisplay();
    
}

function clearDisplay() {
    displayValue = 0;
    currentDisplay.textContent = displayValue;
}

function insertNumber (value) {

    if (resultNumber.length > 0) {
        resultNumber.shift();
        clearDisplay();
        firstStoredOperator = secondStoredOperator;
        sameEquationCount++;
    }

    let digitArray = Array.from(displayValue.toString()).map(Number);
    
    if (digitArray.length < 13) {
        digitArray.push(value);
    } else if (digitArray.length === 13) {
        digitArray.shift();
        digitArray.push(value);
    }
    

    if (digitArray[0] === 0 && digitArray.length > 1) {
        digitArray.shift();
    }

    displayValue = digitArray.join("");
    updateDisplay();

}

function updateDisplay () {

    currentDisplay.textContent = displayValue;
}

function updateActionDisplay (text) {
    actionDisplay.textContent = "" + text + "";
}

function storeOperator (operator) {
    
    if (!firstStoredOperator) {
        firstStoredOperator = operator;
        updateActionDisplay(firstStoredOperator);
    } else if (firstStoredOperator) {
        secondStoredOperator = operator;
        updateActionDisplay(secondStoredOperator);
    }
    
    if (firstNumberStored.length === 0) {
        storeFirstNumber();
        clearDisplay();
    } else if (firstNumberStored.length > 0 && secondNumberStored.length > 0 && resultNumber.length > 0) {
        secondStoredOperator = operator; 
    } else if (firstNumberStored.length > 0 && firstStoredOperator.length > 0) {
        storeSecondNumber();
        operate(firstStoredOperator, firstNumberStored, secondNumberStored);
    } 

}

function storeFirstNumber () {
    if (firstNumberStored.length === 0) {
        firstNumberStored.push(displayValue);
        clearDisplay();
    } else if (firstNumberStored.length > 0) {
        firstNumberStored.shift();
        firstNumberStored.push(displayValue);
    }
}

function storeSecondNumber () {
    secondNumberStored.push(displayValue);
    if (secondNumberStored.length > 1) {
            secondNumberStored.shift();
    }
}

function calculate() {
    
    if (firstNumberStored.length > 0 && secondNumberStored.length > 0 && resultNumber.length > 0) {
        updateActionDisplay("Click your next number!");
    } else if (firstNumberStored.length > 0) {
        storeSecondNumber();
        operate(firstStoredOperator, firstNumberStored, secondNumberStored);
        updateActionDisplay("Clear all and do another calculation!");
    }  

    if (displayValue === "Infinity") {
        updateActionDisplay("You've opened a black hole!")
    }

}

function removeDigit () {

    let digitArray = Array.from(displayValue.toString()).map(Number);

    if (resultNumber.length > 0 && firstNumberStored && secondNumberStored){
        updateActionDisplay("Cannot backspace the result!");
    } else if (digitArray.length === 1){
        digitArray.splice(0, 1, "0");
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    } else if (digitArray.length > 1) {
        digitArray.splice(digitArray.length - 1, 1);
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    }

}

let calcButtons = document.querySelectorAll('.calcButton');
let buttonArray = Array.from(calcButtons);

buttonArray.forEach(button => {
    button.addEventListener('click', function(e) {
        if (button.getAttribute('id') === 'clear') {
            clearAll();
        } else if (button.getAttribute("id") === 'zero') {
            insertNumber(0);
        } else if (button.getAttribute("id") === 'one') {
            insertNumber(1);
        } else if (button.getAttribute("id") === 'two') {
            insertNumber(2);
        } else if (button.getAttribute("id") === 'three') {
            insertNumber(3);
        } else if (button.getAttribute("id") === 'four') {
            insertNumber(4);
        } else if (button.getAttribute("id") === 'five') {
            insertNumber(5);
        } else if (button.getAttribute("id") === 'six') {
            insertNumber(6);
        } else if (button.getAttribute("id") === 'seven') {
            insertNumber(7);
        } else if (button.getAttribute("id") === 'eight') {
            insertNumber(8);
        } else if (button.getAttribute("id") === 'nine') {
            insertNumber(9);
        } else if (button.getAttribute("id") === 'plus') {
            storeOperator("+");
        } else if (button.getAttribute("id") === 'minus') {
            storeOperator("-");
        } else if (button.getAttribute("id") === 'times') {
            storeOperator("x");
        } else if (button.getAttribute("id") === 'divide') {
            storeOperator("÷");
        } else if (button.getAttribute("id") === 'equals') {
            calculate();
        } else if (button.getAttribute("id") === 'backspace') {
            removeDigit();
        } 
    })
});
 
function clearAll() {

    displayValue = 0;
    resultNumber = [];
    firstNumberStored = [];
    secondNumberStored = [];
    firstStoredOperator = 0;
    secondStoredOperator = 0;
    sameEquationCount = 0;
    currentDisplay.textContent = displayValue;
    actionDisplay.textContent = "Cleared";
}