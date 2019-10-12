'use strict';

(function () {
  window.util = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    getRandomElementFromArray: function (arr) {
      return arr[Math.round(Math.random() * (arr.length - 1))];
    }
  };
})();
