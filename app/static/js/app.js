'use strict';

document.addEventListener('DOMContentLoaded', function () {
	console.log('ready!')
}, false);


var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
initRadio();
initCheckbox();
initQuestions();


// init number of all Questions
function initQuestions() {
	const questions = document.querySelectorAll('form .label');
}

// init all .radio-groups
function initRadio() {
	const radioGr = document.querySelectorAll('.radio-group');
	if (radioGr !== null) {
		// console.log(radioGr.length)
		for (const element of radioGr) {
			const index = [...radioGr].indexOf(element);
			[...element.querySelectorAll('input[type="radio"]')].map(e => e.setAttribute('name', 'radio-group-' + index));
		}
	}
}

// init all .checkbox-groups
function initCheckbox() {
	const checkboxGr = document.querySelectorAll('.checkbox-group');
	if (checkboxGr !== null) {
		// console.log(checkboxGr.length)
		for (const element of checkboxGr) {
			const index = [...checkboxGr].indexOf(element);
			[...element.querySelectorAll('input[type="checkbox"]')].map(e => e.setAttribute('name', 'checkbox-group-' + index));
		}
	}
}


// show .form-header 
function showHeader(n) {
	const headers = document.querySelectorAll('.form-header');

	if (currentTab < headers.length) {
		[...headers].map(e => e.classList.remove('show'));
		headers[currentTab].classList.add('show'); //
	}
}

// progress line
function progress() {
	const progress = document.querySelector('.progress');
	if (progress !== null) {
		// Progress Line
		var currentProgress = (100 / document.querySelectorAll(".tab").length) * (currentTab + 1);
		progress.querySelector('.progress-done').style.width = currentProgress + "%";

		// Counter
		progress.querySelector('.total-pages').textContent = document.querySelectorAll(".tab").length; // total pages
		progress.querySelector('.current-page').textContent = currentTab + 1; // current page
	}
}

function showTab(n) {
	console.log("Текущая стр: " + (currentTab + 1));
	progress();
	showHeader(n);
	if (document.querySelector(".tab") !== null) {
		// This function will display the specified tab of the form ...
		var x = document.querySelectorAll(".tab");
		x[n].classList.add('active');
		// ... and fix the Previous/Next buttons:
		if (n == 0) {
			document.querySelector("#prevBtn").style.display = "none";
			document.querySelector('#nextBtn').textContent = "Начнем!";
		} else {
			document.querySelector("#prevBtn").style.display = "inline";
			document.querySelector('#nextBtn').textContent = "Дальше"
		}
		if ((n + 1) == x.length) {
			document.querySelector("#nextBtn").innerHTML = "Готово";
		}
	}

}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.getElementsByClassName("tab");
	// Exit the function if any field in the current tab is invalid:

	if (n == 1 && !validateForm()) return false;
	// Hide the current tab:
	x[currentTab].classList.remove('active');
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		//...the form gets submitted:
		document.getElementById("form").submit();
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}


// Валидация
function validateForm() {
	// This function deals with validation of the form fields
	// var x, y, i, valid = true;
	var valid = true;
	// x = document.getElementsByClassName("tab");
	// y = x[currentTab].querySelectorAll("input[required]");


	// A loop that checks every input field in the current tab:
	// for (i = 0; i < y.length; i++) {
	// 	// If a field is empty...
	// 	if (y[i].value == "") {
	// 		// add an "invalid" class to the field:
	// 		y[i].className += " invalid";
	// 		// and set the current valid status to false:
	// 		valid = false;
	// 	}
	// }

	// 
	// const radioRequired = x[currentTab].querySelectorAll('.radio-group.required');

	// for (i = 0; i < radioRequired.length; i++) {
	// 	if (radioRequired[i].querySelector("input:checked") == null) {
	// 		radioRequired[i].classList.add('invalid');
	// 		valid = false;
	// 	} else {
	// 		valid = true;
	// 		radioRequired[i].classList.remove('invalid');
	// 	}
	// }

	// // 
	// const checkboxRequired = x[currentTab].querySelectorAll('.checkbox-group.required');

	// for (i = 0; i < checkboxRequired.length; i++) {
	// 	if (checkboxRequired[i].querySelector("input:checked") == null) {
	// 		checkboxRequired[i].classList.add('invalid');
	// 		valid = false;
	// 	} else {
	// 		valid = true;
	// 		checkboxRequired[i].classList.remove('invalid');
	// 	}
	// }


	// If the valid status is true, mark the step as finished and valid:
	// if (valid) {

	// }
	return valid; // return the valid status
}

// document.addEventListener('input', e => {
// 	if (e.target.matches('input')) {
// 		e.target.classList.remove('invalid')
// 		// e.target.closest('.required').classList.remove('invalid');
// 	}
// });