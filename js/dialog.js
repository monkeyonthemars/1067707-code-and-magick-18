'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupUserNameElement = document.querySelector('.setup-user-name');
  var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballElement = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('.setup-wizard-appearance input[name=coat-color]');
  var eyesColorInput = document.querySelector('.setup-wizard-appearance input[name=eyes-color]');
  var fireballColorInput = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');
  var userDialog = document.querySelector('.setup');

  var closeSetup = function () {
    userDialog.classList.add('hidden');
    setupCloseElement.removeEventListener('click', closeSetup);
    setupCloseElement.removeEventListener('keydown', onSetupCloseEnterPress);
    wizardCoatElement.removeEventListener('click', onWizardCoatElementClick);
    wizardEyesElement.removeEventListener('click', onWizardEyesElementClick);
    fireballElement.removeEventListener('click', onFireballElementClick);
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && evt.target === setupCloseElement) {
      closeSetup();
    }
  };

  var onSetupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSetup();
    }
  };

  var openSetup = function () {
    userDialog.classList.remove('hidden');
    setupCloseElement.addEventListener('click', closeSetup);
    setupCloseElement.addEventListener('keydown', onSetupCloseEnterPress);
    wizardCoatElement.addEventListener('click', onWizardCoatElementClick);
    wizardEyesElement.addEventListener('click', onWizardEyesElementClick);
    fireballElement.addEventListener('click', onFireballElementClick);
    document.addEventListener('keydown', onSetupEscPress);
  };

  var onClickSetup = function () {
    openSetup();
  };

  var onSetupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openSetup();
    }
  };

  var onWizardCoatElementClick = function () {
    var randomColor = window.util.getRandomElementFromArray(window.util.COAT_COLORS);
    wizardCoatElement.setAttribute('style', 'fill: ' + randomColor);
    coatColorInput.setAttribute('value', randomColor);
  };

  var onWizardEyesElementClick = function () {
    var randomColor = window.util.getRandomElementFromArray(window.util.EYES_COLORS);
    wizardEyesElement.setAttribute('style', 'fill: ' + randomColor);
    eyesColorInput.setAttribute('value', randomColor);
  };

  var onFireballElementClick = function () {
    var randomColor = window.util.getRandomElementFromArray(FIREBALL_COLORS);
    fireballElement.setAttribute('style', 'background-color: ' + randomColor);
    fireballColorInput.setAttribute('value', randomColor);
  };

  setupUserNameElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });

  setupUserNameElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });

  setupOpenElement.addEventListener('click', onClickSetup);
  setupOpenElement.addEventListener('keydown', onSetupEnterPress);
})();
