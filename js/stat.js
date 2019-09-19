'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP_BETWEEN = 50;

var BAR_GAP_LEFT = 30;
var FONT_GAP = 5;
var FONT_HEIGHT = 20;
var barGapTop = CLOUD_Y + SHADOW_GAP + FONT_GAP + FONT_HEIGHT * 2 + FONT_GAP + FONT_HEIGHT;

var renderCloud = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)', CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!',
      CLOUD_X + SHADOW_GAP + FONT_GAP,
      CLOUD_Y + SHADOW_GAP + FONT_GAP + FONT_HEIGHT
  );

  ctx.fillText('Список результатов:',
      CLOUD_X + SHADOW_GAP + FONT_GAP,
      CLOUD_Y + SHADOW_GAP + FONT_GAP + FONT_HEIGHT * 2
  );

  for (var i = 0; i < players.length; i++) {
    var barGapLeft = CLOUD_X + SHADOW_GAP + BAR_GAP_LEFT + (BAR_WIDTH + BAR_GAP_BETWEEN) * i;

    ctx.fillStyle = '#000';

    ctx.fillText(
        players[i],
        barGapLeft,
        CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2
    );

    ctx.fillText(
        Math.round(times[i]),
        barGapLeft,
        CLOUD_Y + barGapTop - FONT_GAP * 2 + MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }

    ctx.fillRect(
        barGapLeft,
        CLOUD_Y + barGapTop + MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime,
        BAR_WIDTH,
        (MAX_BAR_HEIGHT * times[i]) / maxTime
    );

  }
};
