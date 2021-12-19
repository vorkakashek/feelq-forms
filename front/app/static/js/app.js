'use strict';

document.addEventListener('DOMContentLoaded', function () {
	console.log('ready!')
}, false);


var currentTab = 0; // Current tab is set to be the first tab (0)
var currentTabGroup = 0;
var currentHeader = 0;

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
function showHeader() {
	const headers = document.querySelectorAll('.form-header');


	if (document.querySelectorAll('.tab-group')[currentTabGroup].matches('.thanks')) {
		[...headers].map(e => e.classList.remove('show'));
	} else {
		[...headers].map(e => e.classList.remove('show'));
		if (currentTabGroup == 0) {
			if (currentTab == 0) {
				headers[0].classList.add('show');
				currentHeader = 1;
			} else {
				headers[currentHeader].classList.add('show');
			}
		} else {
			headers[currentHeader].classList.add('show');
		}
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
	showHeader();
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

var tabsCounter = document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length;


function nextPrev(n) {
	// This function will figure out which tab to display	
	var x = document.getElementsByClassName("tab");
	// Exit the function if any field in the current tab is invalid:

	if (n == 1 && !validateForm()) return false;
	// Hide the current tab:
	x[currentTab].classList.remove('active');
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;

	if (n > 0) {
		tabsCounter -= 1;
		console.log('Вперед!')
		if (tabsCounter <= 0) {
			nextGroup();
		}
		if (tabsCounter == document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length) {
			document.querySelector('#prevBtn').classList.add('hide');
		} else {
			document.querySelector('#prevBtn').classList.remove('hide');
		}
	}

	if (n < 0) {
		tabsCounter += 1;
		if (tabsCounter == document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length) {
			document.querySelector('#prevBtn').classList.add('hide');
		} else {
			document.querySelector('#prevBtn').classList.remove('hide');
		}
		console.log('Назад!')
	}


	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);

}

function nextGroup() {
	currentTabGroup += 1;
	
	if (!(document.querySelectorAll('.tab-group')[currentTabGroup].matches('.thanks'))) {
		currentHeader += 1;
	}
	// обнуляем счетчик табов в текущем tab group
	tabsCounter = document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length;
	document.querySelector('#prevBtn').classList.add('hide');

	[...document.querySelectorAll('.tab-group')].map(e => e.classList.remove('active'));
	document.querySelectorAll('.tab-group')[currentTabGroup].classList.add('active');

	if (document.querySelectorAll('.tab-group')[currentTabGroup].matches('.thanks')) {
		hideFormUI();
	} else {
		showFormUI();
	}
}

function hideFormUI() {
	const headers = document.querySelectorAll('.form-header');

	document.querySelector('.panel-footer').classList.add('hide');
	document.querySelector('.progress').classList.add('hide');
	[...headers].map(e => e.classList.remove('show'));
}

function showFormUI() {
	const headers = document.querySelectorAll('.form-header');

	document.querySelector('.panel-footer').classList.remove('hide');
	document.querySelector('.progress').classList.remove('hide');
	headers[0].classList.add('show');
}

// Валидация
function validateForm() {
	var valid = true;

	return valid; // return the valid status
}