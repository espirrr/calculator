var displayValue = 0;
var finalNumber = [];
var firstNumberStored = [];
var secondNumberStored = [];
var textOperator;
var storedOperator;

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
}8

function operate(operator, a, b) {
    let result;

    if (finalNumber[0] === undefined){
        if (operator === 1) {
            result = add(a,b);
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        } else if (operator === 2) {
            result = subtract(a,b);
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        } else if (operator === 3) {
            result = multiply(a,b);
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        } else if (operator === 4) {
            result = divide(a,b);
            result = Number.parseFloat(result).toFixed(2);
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        }
    } else if (finalNumber[0]) {
        
        if (operator === 1) {
            result = add(a,b);
            finalNumber = [];
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        } else if (operator === 2) {
            result = subtract(finalNumber,b);
            finalNumber = [];
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        } else if (operator === 3) {
            result = multiply(finalNumber,b);
            finalNumber = [];
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        } else if (operator === 4) {
            result = divide(finalNumber,b);
            finalNumber = [];
            finalNumber.push(result);
            finalNumber = finalNumber.join("");
        }
    }
    
    displayValue = finalNumber;
    currentDisplay.textContent = finalNumber;
}

function clearDisplay() {
    displayValue = 0;
    currentDisplay.textContent = displayValue;
}

function clearAll() {

    displayValue = 0;
    finalNumber = [];
    firstNumberStored = [];
    secondNumberStored = [];
    textOperator = "";
    storedOperator = 0;

    currentDisplay.textContent = displayValue;
    actionDisplay.textContent = "Cleared";
}

function removeDigit () {
    let digitArray = Array.from(displayValue.toString()).map(Number);
    if (digitArray.length === 1){
        displayValue = 0;
        currentDisplay.textContent = displayValue;
    } else if (digitArray.length > 1) {
        digitArray.splice(digitArray.length - 1, 1);
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    }
}

function insertNumber (value) {

    let digitArray = Array.from(displayValue.toString()).map(Number);
    
    if (digitArray[0] === 0 && digitArray.length === 1) {
        digitArray.splice(0, 1, value);
        displayValue = digitArray.join();
        currentDisplay.textContent = displayValue;
    } else if (digitArray.length >= 1 && digitArray.length < 13 && finalNumber[0]) {
        digitArray = [];
        digitArray.push(value);
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    } else if (digitArray.length >= 1 && digitArray.length < 13) {
        digitArray.push(value);
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    } else if (digitArray.length === 13) {
        digitArray.splice(0, 1);
        digitArray.push(value);
        displayValue = digitArray.join("");
        currentDisplay.textContent = displayValue;
    }
    return displayValue;
}

function storeFirstNumber (value) {
    
    if (firstNumberStored[0] === undefined) {
        firstNumberStored.push(displayValue);
        firstNumberStored = firstNumberStored.join("");
       

    } else if (firstNumberStored) {
        actionDisplay.textContent = "Insert the next number!";
    }
}

let calcButtons = document.querySelectorAll('.calcButton');
let buttonArray = Array.from(calcButtons);

buttonArray.forEach(button => {
    button.addEventListener('click', function(e) {
        if (button.getAttribute('id') === 'clear') {
            clearAll();
        } else if (button.getAttribute("id") === 'backspace') {
            
            if (finalNumber[0]) {
                clearAll();
            } else {
                removeDigit();
            }
            
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
            storedOperator = 1;
            textOperator = "+";
            actionDisplay.textContent = textOperator;
            if (firstNumberStored[0] === undefined && secondNumberStored !== undefined) {
                storeFirstNumber();
                clearDisplay();
            } else if (firstNumberStored[0]) {
                secondNumberStored = displayValue;
                console.log(secondNumberStored);
                operate(storedOperator, firstNumberStored, secondNumberStored);
                firstNumberStored = finalNumber;
                console.log(firstNumberStored);
                
            }
          
        } else if (button.getAttribute("id") === 'minus') {
            storedOperator = 2;
            textOperator = "-";
            actionDisplay.textContent = textOperator;

            if (firstNumberStored[0] === undefined && secondNumberStored !== undefined) {
                storeFirstNumber();
                clearDisplay();
            } else if (firstNumberStored[0]) {
                secondNumberStored = displayValue;
                operate(storedOperator, firstNumberStored, secondNumberStored);
                firstNumberStored = finalNumber;
            }

        } else if (button.getAttribute("id") === 'times') {
            storedOperator = 3;
            textOperator = "x";
            actionDisplay.textContent = textOperator;

            if (firstNumberStored[0] === undefined && secondNumberStored !== undefined) {
                storeFirstNumber();
                clearDisplay();
            } else if (firstNumberStored[0]) {
                secondNumberStored = displayValue;
                operate(storedOperator, firstNumberStored, secondNumberStored);
                firstNumberStored = finalNumber;
            }
        } else if (button.getAttribute("id") === 'divide') {
            storedOperator = 4;
            textOperator = "÷";
            actionDisplay.textContent = textOperator;

            if (firstNumberStored[0] === undefined && secondNumberStored !== undefined) {
                storeFirstNumber();
                clearDisplay();
            } else if (firstNumberStored[0]) {
                secondNumberStored = displayValue;
                operate(storedOperator, firstNumberStored, secondNumberStored);
                firstNumberStored = finalNumber;
            }
            
        } else if (button.getAttribute("id") === 'equals') {

            if (firstNumberStored[0] === undefined) {
                actionDisplay.textContent = "Choose number or operator!";

            } else {
                secondNumberStored = displayValue;
                operate(storedOperator, firstNumberStored, secondNumberStored);
                actionDisplay.textContent = "=";
            }
            
        } 
        
        
    })
});

// addEventListener('click', () => {
//     if (calcButton.getAttribute('id') === 'clear') {
//         clearAll();
//     }
// })

// const buttonArray = Array.from(document.querySelectorAll('.calcButton'));

// buttonArray.forEach(buttonElement => {
//     buttonElement.addEventListener('click', function(e){ 
//         removeExistingDisplay();
//     })
// });




