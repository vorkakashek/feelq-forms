'use strict';

document.addEventListener('DOMContentLoaded', function () {
	console.log('ready!')
}, false);


var currentTab = 0; // Current tab is set to be the first tab (0)
var currentTabGroup = 0;
var currentTabGroupThanks = 0;
var currentTabIndex = 0;
var tabsCounter = document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length;

showTab(currentTab); // Display the current tab

// show .form-header 
function showHeader() {
	const headers = document.querySelectorAll('.form-header');

	if (document.querySelectorAll('.tab')[currentTab].matches('.thanks')) {
		currentTabGroupThanks++;
		[...headers].map(e => e.classList.remove('show'));
		return;
	}
	[...headers].map(e => e.classList.remove('show'));
	if (currentTabGroup === 0) {
		if (currentTab === 0) {
			headers[0].classList.add('show');
		} else {
			headers[currentTab - currentTabGroupThanks].classList.add('show');
		}
	} else {
		headers[currentTab - currentTabGroupThanks].classList.add('show');
	}
}

// progress line
function progress() {
	const progress = document.querySelector('.progress');
	if (progress !== null) {
		// Progress Line
		var currentTabNumber = currentTab - currentTabGroupThanks + 1;
		var currentProgress = (100 / document.querySelectorAll(".tab:not(.thanks)").length) * currentTabNumber;
		progress.querySelector('.progress-done').style.width = currentProgress + "%";

		// Counter
		progress.querySelector('.total-pages').textContent = document.querySelectorAll(".tab:not(.thanks)").length; // total pages
		progress.querySelector('.current-page').textContent = currentTabNumber; // current page
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
		if(currentTab === 0) {
			document.querySelector('#nextBtn').textContent = "Начнем!";
		}
		if (tabsCounter === document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length || document.querySelectorAll('.tab')[currentTab].matches('.thanks')) {
			document.querySelector('#prevBtn').classList.add('hide');
			document.querySelector('#prevBtn').classList.remove('show');
		} else {
			document.querySelector('#prevBtn').classList.add('show');
			document.querySelector('#prevBtn').classList.remove('hide');
			document.querySelector('#nextBtn').textContent = "Дальше"
		}
		if ((n + 1) === x.length) {
			document.querySelector("#nextBtn").innerHTML = "Готово";
		}
	}

}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.querySelectorAll(".tab");
	// Exit the function if any field in the current tab is invalid:

	if (n === 1 && !validateForm()) return false;
	// Hide the current tab:
	x[currentTab].classList.remove('active');
	// Increase or decrease the current tab by 1:
	currentTab += n;

	tabsCounter += n > 0 ? -1 : 1;
	if (tabsCounter <= 0) {
		nextGroup();
	}


	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
		return false;
	}

	if (document.querySelectorAll('.tab')[currentTab].matches('.thanks')) {
		hideFormUI();
	} else {
		showFormUI();
	}

	// Otherwise, display the correct tab:
	showTab(currentTab);
}

function nextGroup() {
	currentTabGroup++;

	// обнуляем счетчик табов в текущем tab group
	tabsCounter = document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length;
	document.querySelector('#prevBtn').classList.add('hide');

	[...document.querySelectorAll('.tab-group')].map(e => e.classList.remove('active'));
	document.querySelectorAll('.tab-group')[currentTabGroup].classList.add('active');
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