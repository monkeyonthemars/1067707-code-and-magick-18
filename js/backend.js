'use strict';

(function () {

  var getXMLHttpRequest = function (URL, method, onLoad, onError, data) {
    var TIMEOUT = 10000;
    var StatusCode = {
      OK: 200
    };
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, URL);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }

  };

  window.backend = {
    load: function (onLoad, onError) {

      getXMLHttpRequest('https://js.dump.academy/code-and-magick/data', 'GET', onLoad, onError);

    },
    save: function (data, onLoad, onError) {

      getXMLHttpRequest('https://js.dump.academy/code-and-magick', 'POST', onLoad, onError, data);

    },
  };

})();
