'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_SPACE_BETWEEN = 50;

var BAR_START_X_POSITION = 140;
var BAR_START_Y_POSITION = 250;
var FONT_HEIGHT = 20;
var NAME_START_Y_POSITION = 270;
var MESSAGE_START_X_POSITION = 115;
var MESSAGE_START_Y_POSITION = 45;
var TIME_START_Y_POSITION = 240;

var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElementFromArray = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.stat = {
  render: function (ctx, players, times) {
    var maxTime = getMaxElementFromArray(times);

    renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';

    ctx.fillText('Ура вы победили!',
        MESSAGE_START_X_POSITION,
        MESSAGE_START_Y_POSITION
    );

    ctx.fillText('Список результатов:',
        MESSAGE_START_X_POSITION,
        MESSAGE_START_Y_POSITION + FONT_HEIGHT
    );

    for (var i = 0; i < players.length; i++) {
      var currentBarXPosition = BAR_START_X_POSITION + (BAR_WIDTH + BAR_SPACE_BETWEEN) * i;
      var currentBarHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;

      ctx.fillStyle = '#000';

      ctx.fillText(
          players[i],
          currentBarXPosition,
          NAME_START_Y_POSITION
      );

      ctx.fillText(
          Math.round(times[i]),
          currentBarXPosition,
          TIME_START_Y_POSITION - currentBarHeight
      );

      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
      }

      ctx.fillRect(
          currentBarXPosition,
          BAR_START_Y_POSITION - currentBarHeight,
          BAR_WIDTH,
          currentBarHeight
      );
    }
  }
};
