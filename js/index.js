/*queryselector method selects the first element that matches a specified CSS selector within the document.
and queryselectorall method selects all elements that match a specified CSS selector within the document.*/

const numbers = document.querySelectorAll('.numbers');
const displayCalculator = document.querySelector('.displayCalculator span');
const equals = document.querySelector('.equals');
const signs = document.querySelectorAll('.sign');
const plusminus = document.querySelector('.plusminus');
const clear = document.querySelector('.clear');
const percent = document.querySelector('.percent');
const dot = document.querySelector('.dot');

    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultvalue = 0;

// Event listener for number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
            attribute = e.target.getAttribute('value');
        if (!isFirstValue) {
            getFirstValue(attribute);
        } else {
            getSecondValue(attribute);
        }
    });
});

// Event listeners for sign buttons
signs.forEach(signButton => {
    signButton.addEventListener('click', (e) => {
        sign = e.target.getAttribute('value');
        isFirstValue = true;
    });
});

equals.addEventListener('click', () => {
    displayCalculator.innerHTML = "";
    if (sign === "+") {
        resultvalue = parseFloat(firstValue) + parseFloat(secondValue);
    } else if(sign === "-") {
        resultvalue = parseFloat(firstValue) - parseFloat(secondValue);
    } else if(sign === "×") {
        resultvalue = parseFloat(firstValue) * parseFloat(secondValue);
    } else if(sign === "/") {
        if (parseFloat(secondValue) === 0) {
            resultvalue = "Error"; // Handle division by zero
        } else {
            resultvalue = parseFloat(firstValue) / parseFloat(secondValue);
        }
    }
    displayCalculator.innerHTML = resultvalue;
    firstValue = resultvalue.toString();
    secondValue = "";
});

// Function to handle the first value
function getFirstValue(inputValue) {
    displayCalculator.innerHTML = "";
    firstValue += inputValue;
    displayCalculator.style.fontSize = "70px"; 
    displayCalculator.innerHTML = firstValue;
}

// Function to handle the second value
function getSecondValue(inputValue) {
    if (firstValue !== "" && sign !== "") {
        secondValue += inputValue; 
        displayCalculator.style.fontSize = "70px"; 
        displayCalculator.innerHTML = secondValue;
    }   
}

// Function to check and truncate result length
function checkResultLength() {
        resultString = resultvalue.toString();
    if (resultString.length >= 8) {
        resultString = resultString.substring(0, 8);
    }
    displayCalculator.innerHTML = resultString;
}

//event listener to add plusminus 
plusminus.addEventListener('click', () => {
    displayCalculator.innerHTML = "";
    if (firstValue != "") {
        resultString = -parseFloat(firstValue);
        firstValue = resultString;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultString = -parseFloat(resultString);
    }
    displayCalculator.innerHTML = resultString;
});

//event listener to add percent
percent.addEventListener('click', () => {
    displayCalculator.innerHTML = "";
    if (firstValue != "") {
        resultString = parseFloat(firstValue / 100);
        firstValue = resultString;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultString = parseFloat(resultString / 100);
    }
    displayCalculator.innerHTML = resultString;
});

//event listener to clear
clear.addEventListener('click', () => {
    displayCalculator.innerHTML = 0;
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultvalue = 0;
});

// Event listener for the decimal point button
dot.addEventListener('click', () => {
    if (isFirstValue && sign !== "" && !secondValue.includes('.')) {
        secondValue += '.';
        displayCalculator.innerHTML = secondValue;
    } else if (!isFirstValue && !firstValue.includes('.')) {
        // If no sign has been chosen and a decimal point is not already present in the first value
        firstValue += '.';
        displayCalculator.innerHTML = firstValue;
    }
});


