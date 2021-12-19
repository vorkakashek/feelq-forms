'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener('DOMContentLoaded', function () {
  console.log('ready!');
}, false);
var currentTab = 0; // Current tab is set to be the first tab (0)

showTab(currentTab); // Display the current tab

initRadio(); // автоматом заполняем name всем группам радио боксов

initCheckbox(); // автоматом заполняем name всем группам чекбоксов
// init all .radio-groups

function initRadio() {
  var radioGr = document.querySelectorAll('.radio-group');

  if (radioGr !== null) {
    var _iterator = _createForOfIteratorHelper(radioGr),
        _step;

    try {
      var _loop = function _loop() {
        var element = _step.value;

        var index = _toConsumableArray(radioGr).indexOf(element);

        _toConsumableArray(element.querySelectorAll('input[type="radio"]')).map(function (e) {
          return e.setAttribute('name', 'radio-group-' + index);
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
} // init all .checkbox-groups


function initCheckbox() {
  var checkboxGr = document.querySelectorAll('.checkbox-group');

  if (checkboxGr !== null) {
    var _iterator2 = _createForOfIteratorHelper(checkboxGr),
        _step2;

    try {
      var _loop2 = function _loop2() {
        var element = _step2.value;

        var index = _toConsumableArray(checkboxGr).indexOf(element);

        _toConsumableArray(element.querySelectorAll('input[type="checkbox"]')).map(function (e) {
          return e.setAttribute('name', 'checkbox-group-' + index);
        });
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
} // show .form-header 


function showHeader(n) {
  var headers = document.querySelectorAll('.form-header');

  if (currentTab < headers.length) {
    _toConsumableArray(headers).map(function (e) {
      return e.classList.remove('show');
    });

    headers[currentTab].classList.add('show'); //
  }
} // progress line


function progress() {
  var progress = document.querySelector('.progress');

  if (progress !== null) {
    // Progress Line
    var currentProgress = 100 / document.querySelectorAll(".tab").length * (currentTab + 1);
    progress.querySelector('.progress-done').style.width = currentProgress + "%"; // Counter

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
    x[n].classList.add('active'); // ... and fix the Previous/Next buttons:

    if (n == 0) {
      document.querySelector("#prevBtn").style.display = "none";
      document.querySelector('#nextBtn').textContent = "Начнем!";
    } else {
      document.querySelector("#prevBtn").style.display = "inline";
      document.querySelector('#nextBtn').textContent = "Дальше";
    }

    if (n + 1 == x.length) {
      document.querySelector("#nextBtn").innerHTML = "Готово";
    }
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab"); // Exit the function if any field in the current tab is invalid:

  if (n == 1 && !validateForm()) return false; // Hide the current tab:

  x[currentTab].classList.remove('active'); // Increase or decrease the current tab by 1:

  currentTab = currentTab + n; // if you have reached the end of the form... :

  if (currentTab >= x.length) {
    //...the form gets submitted:
    // document.getElementById("form").submit();
    return false;
  } // Otherwise, display the correct tab:


  showTab(currentTab);
} // Валидация


function validateForm() {
  var valid = true;
  return valid; // return the valid status
}