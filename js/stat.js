'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var GAP_X = 30;
var FONT_GAP = 5;
var FONT_HEIGHT = 20;
var barGapY = CLOUD_Y + GAP + FONT_GAP + FONT_HEIGHT + FONT_HEIGHT + FONT_GAP + FONT_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!',
      CLOUD_X + GAP + FONT_GAP,
      CLOUD_Y + GAP + FONT_GAP + FONT_HEIGHT
  );

  ctx.fillText('Список результатов:',
      CLOUD_X + GAP + FONT_GAP,
      CLOUD_Y + GAP + FONT_GAP + FONT_HEIGHT + FONT_HEIGHT
  );

  for (var i = 0; i < players.length; i++) {

    ctx.fillStyle = '#000';

    ctx.fillText(
        players[i],
        CLOUD_X + GAP + GAP_X + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + GAP + GAP_X + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + barGapY - GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime
    );

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }

    ctx.fillRect(
        CLOUD_X + GAP + GAP_X + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + barGapY + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );

  }
};
