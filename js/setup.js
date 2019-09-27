'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpenElement = document.querySelector('.setup-open');
var setupOpenIconElement = document.querySelector('.setup-open-icon');
var setupCloseElement = document.querySelector('.setup-close');
var setupUserNameElement = document.querySelector('.setup-user-name');
var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireballElement = document.querySelector('.setup-fireball-wrap');
var coatColorInputElement = document.querySelector('.setup-wizard-appearance input[name=coat-color]');
var eyesColorInputElement = document.querySelector('.setup-wizard-appearance input[name=eyes-color]');
var fireballColorInputElement = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');


var getRandomElementFromArray = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards.push(
        {
          name: getRandomElementFromArray(FIRST_NAMES) + ' ' + getRandomElementFromArray(SECOND_NAMES),
          coatColor: getRandomElementFromArray(COAT_COLORS),
          eyesColor: getRandomElementFromArray(EYES_COLORS)
        }
    );
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (listWizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listWizards.length; i++) {
    fragment.appendChild(renderWizard(listWizards[i]));
  }

  return fragment;
};

var onWizardCoatElementClick = function () {
  var randomColor = getRandomElementFromArray(COAT_COLORS);
  wizardCoatElement.setAttribute('style', 'fill: ' + randomColor);
  coatColorInputElement.setAttribute('value', randomColor);
};

var onWizardEyesElementClick = function () {
  var randomColor = getRandomElementFromArray(EYES_COLORS);
  wizardEyesElement.setAttribute('style', 'fill: ' + randomColor);
  eyesColorInputElement.setAttribute('value', randomColor);
};

var onWizardFireballElementClick = function () {
  var randomColor = getRandomElementFromArray(FIREBALL_COLORS);
  wizardFireballElement.setAttribute('style', 'background-color: ' + randomColor);
  fireballColorInputElement.setAttribute('value', randomColor);
};

var openSetup = function () {
  userDialog.classList.remove('hidden');
  setupCloseElement.addEventListener('click', closeSetup);
  setupCloseElement.addEventListener('keydown', onSetupCloseEnterPress);
  document.addEventListener('keydown', onSetupEscPress);
  wizardCoatElement.addEventListener('click', onWizardCoatElementClick);
  wizardEyesElement.addEventListener('click', onWizardEyesElementClick);
  wizardFireballElement.addEventListener('click', onWizardFireballElementClick);
};

var closeSetup = function () {
  userDialog.classList.add('hidden');
  setupCloseElement.removeEventListener('click', closeSetup);
  setupCloseElement.removeEventListener('keydown', onSetupCloseEnterPress);
  document.removeEventListener('keydown', onSetupEscPress);
  wizardCoatElement.removeEventListener('click', onWizardCoatElementClick);
  wizardEyesElement.removeEventListener('click', onWizardEyesElementClick);
  wizardFireballElement.removeEventListener('click', onWizardFireballElementClick);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserNameElement) {
    closeSetup();
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && evt.target === setupCloseElement) {
    closeSetup();
  }
};

var wizards = getWizards();
similarListElement.appendChild(renderWizards(wizards));
userDialog.querySelector('.setup-similar').classList.remove('hidden');

setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupOpenElement.addEventListener('click', openSetup);
