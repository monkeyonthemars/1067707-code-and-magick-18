'use strict';

(function () {

  var WizzardsInfo = {};

  var onLoad = function (data) {
    WizzardsInfo.wizards = data;
    window.similar.update(WizzardsInfo);
    document.querySelector('.setup-similar').classList.remove('hidden');

  };

  var onError = function (message) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.setup = {

    onEyesChange: window.debounce(function (color) {
      WizzardsInfo.eyesColor = color;
      window.similar.update(WizzardsInfo);
    }),

    onCoatChange: window.debounce(function (color) {
      WizzardsInfo.coatColor = color;
      window.similar.update(WizzardsInfo);
    })
  };

  window.backend.load(onLoad, onError);

})();
