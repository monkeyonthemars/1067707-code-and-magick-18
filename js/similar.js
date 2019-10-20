'use strict';

var RANK_COAT = 2;
var RANK_EYES = 1;

var getRank = function (wizard, WizardsInfo) {
  var rank = 0;

  if (wizard.colorCoat === WizardsInfo.coatColor) {
    rank += RANK_COAT;
  }
  if (wizard.colorEyes === WizardsInfo.eyesColor) {
    rank += RANK_EYES;
  }

  return rank;
};

window.similar = {
  update: function (wizards, WizardsInfo) {
    window.renderWizards(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right, WizardsInfo) - getRank(left, WizardsInfo);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  }
};
