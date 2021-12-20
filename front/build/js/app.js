'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener('DOMContentLoaded', function () {
  console.log('ready!');
}, false);
Inputmask('phone').mask('input.phone');
Inputmask('email').mask('input.email');
var currentTab = 0; // Current tab is set to be the first tab (0)

var currentTabGroup = 0;
var currentTabGroupThanks = 0;
var currentTabIndex = 0;
var tabsCounter = document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length;
showTab(currentTab); // Display the current tab
// show .form-header 

function showHeader() {
  var headers = document.querySelectorAll('.form-header');

  if (document.querySelectorAll('.tab')[currentTab].matches('.thanks')) {
    currentTabGroupThanks++;

    _toConsumableArray(headers).map(function (e) {
      return e.classList.remove('show');
    });

    return;
  }

  _toConsumableArray(headers).map(function (e) {
    return e.classList.remove('show');
  });

  if (currentTabGroup === 0) {
    if (currentTab === 0) {
      headers[0].classList.add('show');
    } else {
      headers[currentTab - currentTabGroupThanks].classList.add('show');
    }
  } else {
    headers[currentTab - currentTabGroupThanks].classList.add('show');
  }
} // progress line


function progress() {
  var progress = document.querySelector('.progress');

  if (progress !== null) {
    // Progress Line
    var currentTabNumber = currentTab - currentTabGroupThanks + 1;
    var currentProgress = 100 / document.querySelectorAll(".tab:not(.thanks)").length * currentTabNumber;
    progress.querySelector('.progress-done').style.width = currentProgress + "%"; // Counter

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
    x[n].classList.add('active'); // ... and fix the Previous/Next buttons:

    if (currentTab === 0) {
      document.querySelector('#nextBtn').textContent = "Начнем!";
    }

    if (tabsCounter === document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length || document.querySelectorAll('.tab')[currentTab].matches('.thanks')) {
      document.querySelector('#prevBtn').classList.add('hide');
      document.querySelector('#prevBtn').classList.remove('show');
    } else {
      document.querySelector('#prevBtn').classList.add('show');
      document.querySelector('#prevBtn').classList.remove('hide');
      document.querySelector('#nextBtn').textContent = "Дальше";
    }

    if (n + 1 === x.length) {
      document.querySelector("#nextBtn").innerHTML = "Готово";
    }
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.querySelectorAll(".tab"); // Exit the function if any field in the current tab is invalid:

  if (n == 1 && !validateForm()) return false; // Hide the current tab:

  x[currentTab].classList.remove('active'); // Increase or decrease the current tab by 1:

  currentTab += n;
  tabsCounter += n > 0 ? -1 : 1;

  if (tabsCounter <= 0) {
    nextGroup();
  } // if you have reached the end of the form... :


  if (currentTab >= x.length) {
    return false;
  }

  if (document.querySelectorAll('.tab')[currentTab].matches('.thanks')) {
    hideFormUI();
  } else {
    showFormUI();
  } // Otherwise, display the correct tab:


  showTab(currentTab);
}

function nextGroup() {
  currentTabGroup++; // обнуляем счетчик табов в текущем tab group

  tabsCounter = document.querySelectorAll('.tab-group')[currentTabGroup].querySelectorAll('.tab').length;
  document.querySelector('#prevBtn').classList.add('hide');

  _toConsumableArray(document.querySelectorAll('.tab-group')).map(function (e) {
    return e.classList.remove('active');
  });

  document.querySelectorAll('.tab-group')[currentTabGroup].classList.add('active');
}

function hideFormUI() {
  var headers = document.querySelectorAll('.form-header');
  document.querySelector('.panel-footer').classList.add('hide');
  document.querySelector('.progress').classList.add('hide');

  _toConsumableArray(headers).map(function (e) {
    return e.classList.remove('show');
  });
}

function showFormUI() {
  var headers = document.querySelectorAll('.form-header');
  document.querySelector('.panel-footer').classList.remove('hide');
  document.querySelector('.progress').classList.remove('hide');
  headers[0].classList.add('show');
} // Валидация


function validateForm() {
  // This function deals with validation of the form fields
  var requireds,
      tab,
      required,
      valid = true;
  tab = document.querySelectorAll(".tab")[currentTab];
  requireds = tab.querySelectorAll(".required");

  for (var i = 0; i < requireds.length; i++) {
    if (requireds[i].matches('.input')) {
      var _inputs = requireds[i].querySelectorAll('input[type="text"]');

      if (_inputs.length > 0) {
        for (var j = 0; j < _inputs.length; j++) {
          if (_inputs[j].value === "") {
            _inputs[j].closest('.input').className += " invalid";
            valid = false;
          }
        }
      }

      _inputs = requireds[i].querySelectorAll('input.phone');

      if (_inputs.length > 0) {
        for (var j = 0; j < _inputs.length; j++) {
          if (!Inputmask('phone').mask(_inputs[j]).isComplete()) {
            _inputs[j].closest('.input').className += " invalid";
            valid = false;
          }
        }
      }

      _inputs = requireds[i].querySelectorAll('input.email');

      if (_inputs.length > 0) {
        // TODO: Email
        for (var j = 0; j < _inputs.length; j++) {
          if (!Inputmask('email').mask(_inputs[j]).isComplete()) {
            _inputs[j].closest('.input').className += " invalid";
            valid = false;
          }
        }
      }
    } // для радио групп


    if (requireds[i].matches('.radio-group')) {
      if (!requireds[i].querySelector('input[type="radio"]:checked')) {
        requireds[i].classList.add('invalid');
        valid = false;
      }
    } // для чекбокс групп


    if (requireds[i].matches('.checkbox-group')) {
      if (!requireds[i].querySelector('input[type="checkbox"]:checked')) {
        requireds[i].classList.add('invalid');
        valid = false;
      }
    } // для текстареа групп


    if (requireds[i].matches('.textarea')) {
      var _inputs2 = requireds[i].querySelectorAll('textarea');

      if (_inputs2.length > 0) {
        for (var j = 0; j < _inputs2.length; j++) {
          if (_inputs2[j].value === "") {
            _inputs2[j].closest('.textarea').className += " invalid";
            valid = false;
          }
        }
      }
    }
  }

  return valid; // return the valid status
} // Убираем .invalid если инпут начали заполнять / выбран хоть 1 чек/радио-бокс
// для инпутов


var inputs = document.querySelectorAll('.required input[type="text"]');

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    e.target.closest('.required').classList.remove('invalid');
  });
} // для радио


inputs = document.querySelectorAll('.required input[type="radio"]');

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    e.target.closest('.required').classList.remove('invalid');
  });
} // для чекбоксов


inputs = document.querySelectorAll('.required input[type="checkbox"]');

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    e.target.closest('.required').classList.remove('invalid');
  });
} // для textarea


inputs = document.querySelectorAll('.required textarea');

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    e.target.closest('.required').classList.remove('invalid');
  });
}
//# sourceMappingURL=app.js.map
