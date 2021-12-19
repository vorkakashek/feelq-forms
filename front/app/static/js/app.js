'use strict';

document.addEventListener('DOMContentLoaded', function () {
	console.log('ready!')
}, false);


var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
initRadio(); // автоматом заполняем name всем группам радио боксов
initCheckbox(); // автоматом заполняем name всем группам чекбоксов


// init all .radio-groups
function initRadio() {
	const radioGr = document.querySelectorAll('.radio-group');
	if (radioGr !== null) {
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
		// document.getElementById("form").submit();
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}


// Валидация
function validateForm() {
	var valid = true;
	
	return valid; // return the valid status
}
