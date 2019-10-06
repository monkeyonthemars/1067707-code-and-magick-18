'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var getWizards = function () {
    var wizards = [];
    for (var i = 0; i < WIZARD_COUNT; i++) {
      wizards.push(
          {
            name: window.util.getRandomElementFromArray(FIRST_NAMES) + ' ' + window.util.getRandomElementFromArray(SECOND_NAMES),
            coatColor: window.util.getRandomElementFromArray(window.util.COAT_COLORS),
            eyesColor: window.util.getRandomElementFromArray(window.util.EYES_COLORS)
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

  var wizards = getWizards();
  similarListElement.appendChild(renderWizards(wizards));
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
