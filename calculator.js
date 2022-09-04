var displayValue = 0;
var resultNumber = [];
var firstNumberStored = [];
var secondNumberStored = [];
var textOperator;
var firstStoredOperator;
var secondStoredOperator;
var sameEquationCount = 0;

let currentDisplay = document.getElementById('calcDisplay');
let parentOfDisplay = document.querySelector('#topSide');
let actionDisplay = document.getElementById('calcNotes');

currentDisplay.textContent = displayValue;
actionDisplay.textContent = "Click to use Calculator :D";

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
    console.log("First Operator" + firstStoredOperator)
    console.log("Second Operator" + secondStoredOperator)

    if (secondStoredOperator && secondNumberStored && resultNumber.length > 0) {
        firstStoredOperator = secondStoredOperator;
    } 

    console.log("First Operator" + firstStoredOperator)
    console.log("Second Operator" + secondStoredOperator)

    if (firstStoredOperator === "+") {
        resultNumber.push(add(a, b));
        console.log ("Result Number:" + resultNumber);
    } else if (firstStoredOperator === "-") {
        resultNumber.push(subtract(a, b));
        console.log ("Result Number:" + resultNumber);
    } else if (firstStoredOperator === "x") {
        resultNumber.push(multiply(a, b));
        console.log ("Result Number:" + resultNumber);
    } else if (firstStoredOperator === "÷") {
        resultNumber.push(divide(a, b));
        console.log ("Result Number:" + resultNumber);
    } 

    displayValue = resultNumber.join();
    firstNumberStored.shift();
    firstNumberStored.push(displayValue);
    console.log("First Number Stored:" + firstNumberStored);
    console.log("resultNumber:" + resultNumber);
    updateDisplay();
    
}

function clearDisplay() {
    displayValue = 0;
    currentDisplay.textContent = displayValue;
}



function insertNumber (value) {

    if (resultNumber.length > 0) {
        console.log ("Result Number:" + resultNumber);
        resultNumber.shift();
        console.log ("Result Number:" + resultNumber);
        clearDisplay();
        firstStoredOperator = secondStoredOperator;
        sameEquationCount++;
    }

    let digitArray = Array.from(displayValue.toString()).map(Number);
    digitArray.push(value);

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
        console.log ("secondStoredOperator if resultNumber exists" + secondStoredOperator);
    } else if (firstNumberStored.length > 0 && firstStoredOperator.length > 0) {
        storeSecondNumber();
        operate(firstStoredOperator, firstNumberStored, secondNumberStored);
    } 

}

function storeFirstNumber () {
    
    if (firstNumberStored.length === 0) {
        firstNumberStored.push(displayValue);
        console.log("First Number Stored:" + firstNumberStored);
        clearDisplay();
    } else if (firstNumberStored.length > 0) {
        firstNumberStored.shift();
        firstNumberStored.push(displayValue);
        console.log("First Number Stored:" + firstNumberStored);
    }
    
}

function storeSecondNumber () {
    
    secondNumberStored.push(displayValue);
    if (secondNumberStored.length > 1) {
            secondNumberStored.shift();
    }
    console.log("Second Number Stored:" + secondNumberStored);
    
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
            if (firstNumberStored.length > 0 && secondNumberStored.length > 0 && resultNumber.length > 0) {
                console.log("Do nothing");
            } else if (firstNumberStored.length > 0) {
                storeSecondNumber();
                operate(firstStoredOperator, firstNumberStored, secondNumberStored);
            }  
        }
    })
});
 
function clearAll() {

    displayValue = 0;
    resultNumber = [];
    firstNumberStored = [];
    secondNumberStored = [];
    textOperator = "";
    firstStoredOperator = 0;
    secondStoredOperator = 0;
    sameEquationCount = 0;

    currentDisplay.textContent = displayValue;
    actionDisplay.textContent = "Cleared";
}