'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupUserNameElement = document.querySelector('.setup-user-name');
  var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballElement = document.querySelector('.setup-fireball-wrap');
  var userDialog = document.querySelector('.setup');

  var closeSetup = function () {
    userDialog.classList.add('hidden');
    setupCloseElement.removeEventListener('click', closeSetup);
    setupCloseElement.removeEventListener('keydown', onSetupCloseEnterPress);
    wizardCoatElement.removeEventListener('click', window.setup.onWizardCoatElementClick);
    wizardEyesElement.removeEventListener('click', window.setup.onWizardEyesElementClick);
    fireballElement.removeEventListener('click', window.setup.onFireballElementClick);
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
    wizardCoatElement.addEventListener('click', window.setup.onWizardCoatElementClick);
    wizardEyesElement.addEventListener('click', window.setup.onWizardEyesElementClick);
    fireballElement.addEventListener('click', window.setup.onFireballElementClick);
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

  setupUserNameElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });

  setupUserNameElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });

  setupOpenElement.addEventListener('click', onClickSetup);
  setupOpenElement.addEventListener('keydown', onSetupEnterPress);
})();
