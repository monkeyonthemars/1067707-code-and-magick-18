'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_COUNT = 4;

var getRandomElementFromArray = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getListWizards = function () {
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

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderListWizards = function (listWizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listWizards.length; i++) {
    fragment.appendChild(renderWizard(listWizards[i]));
  }

  return fragment;
};

var wizards = getListWizards();

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

similarListElement.appendChild(renderListWizards(wizards));

userDialog.querySelector('.setup-similar').classList.remove('hidden');
