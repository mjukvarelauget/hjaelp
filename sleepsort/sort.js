'use strict';


/*
 * Based on https://www.reddit.com/r/programminghorror/comments/lgsd18/i_present_sleepsort/
 */
window.addEventListener('load', init);

let numberList = [];
const NUM_VAL = 50;
const MAX_VAL = 200;
const MIN_VAL = 50;

function init(event) {
    let sortButton = document.querySelector(".sortButton");
    let dataButton = document.querySelector(".generateButton");

    numberList = generateNumbers(NUM_VAL, MIN_VAL, MAX_VAL);
    updateDisplay();
    setupListeners(sortButton, dataButton)
}

function setupListeners(sortButton, dataButton) {
    dataButton.addEventListener(
	'click',
	function(event) {
	    numberList = generateNumbers(NUM_VAL, MIN_VAL, MAX_VAL);
	    updateDisplay();
    });

    sortButton.addEventListener(
	'click',
	function(event) {
	    sleepSort(numberList);
	    updateDisplay();
	}
    )
}

function generateNumbers(len, min, max) {
    let result = [];

    if(min > max) {
	let temp = min;
	min = max;
	max = temp;
    }
    
    for(let i = 0; i < len; i++) {
	let randomNumber = Math.ceil((Math.random() * (max-min+1)) + min);
	result.push(randomNumber);
    }
    return result;
}

function updateDisplay() {
    let display = document.querySelector(".display");
    display.innerHTML = numberList;
}

function sleepSort(listReference) {
    let result = []
    let counter = listReference.length;
    for(let value of listReference) {
	setTimeout(
	    () => {
		result.push(value);
		// Hoping that our one-thread event queue makes
		// this de facto thread safe
		counter -= 1; 
		if(counter < 1) {
		    numberList = result;
		    updateDisplay();
		}
	    },
	    value
	)
    }
}
