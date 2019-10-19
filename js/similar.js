'use strict';

var wizards = [];
var RANK_COAT = 2;
var RANK_EYES = 1;

var getRank = function (wizard, coatColor, eyesColor) {
  var rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += RANK_COAT;
  }
  if (wizard.colorEyes === eyesColor) {
    rank += RANK_EYES;
  }

  return rank;
};

window.similar = {
  update: function (data) {
    window.render.render(data.wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right, data.coatColor, data.eyesColor) - getRank(left, data.coatColor, data.eyesColor);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - data.wizards.indexOf(right);
      }
      return rankDiff;
    }));
  }
};
