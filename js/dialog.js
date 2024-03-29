'use strict';

(function () {
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
  var uploadElement = userDialog.querySelector('.upload');
  var setupWizardForm = userDialog.querySelector('.setup-wizard-form');
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (defaultEvt) {
          defaultEvt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };
        uploadElement.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var closeSetup = function () {
    userDialog.classList.add('hidden');
    setupCloseElement.removeEventListener('click', closeSetup);
    setupCloseElement.removeEventListener('keydown', onSetupCloseEnterPress);
    wizardCoatElement.removeEventListener('click', onWizardCoatElementClick);
    wizardEyesElement.removeEventListener('click', onWizardEyesElementClick);
    fireballElement.removeEventListener('click', onFireballElementClick);
    uploadElement.removeEventListener('mousedown', onMouseDown);
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === KeyCode.ENTER && evt.target === setupCloseElement) {
      closeSetup();
    }
  };

  var onSetupEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
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
    uploadElement.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onSetupEscPress);
  };

  var onClickSetup = function () {
    openSetup();
  };

  var onSetupEnterPress = function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      openSetup();
    }
  };

  var onWizardCoatElementClick = function () {
    var randomColor = window.util.getRandomElementFromArray(window.util.COAT_COLORS);
    wizardCoatElement.setAttribute('style', 'fill: ' + randomColor);
    coatColorInput.setAttribute('value', randomColor);
    window.setup.onCoatChange(randomColor);
  };

  var onWizardEyesElementClick = function () {
    var randomColor = window.util.getRandomElementFromArray(window.util.EYES_COLORS);
    wizardEyesElement.setAttribute('style', 'fill: ' + randomColor);
    eyesColorInput.setAttribute('value', randomColor);
    window.setup.onEyesChange(randomColor);
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

  setupWizardForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardForm), function () {
      userDialog.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
