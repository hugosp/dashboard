function debounce(func) {
  var timer;
  return function(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}

window.addEventListener(
  'resize',
  debounce(function(e) {
    drawGraph();
  })
);

function drawGraph() {
  $('.bar').peity('bar');
  $('.donut')
    .peity('donut')
    .addClass('p-colours');
  $('.line').peity('line');
}

$('.p-colours').peity('donut', {
  fill: function(value, k) {
    console.log(value, k);
    if (k == 1) {
      return '#eee';
    }
    return value > 50 ? 'green' : 'red';
  }
});

$.fn.peity.defaults.bar = {
  delimiter: ',',
  fill: ['#4d89f9'],
  max: null,
  min: 0,
  height: '80%',
  padding: 0.1,
  width: '100%'
};

$.fn.peity.defaults.line = {
  delimiter: ',',
  fill: '#c6d9fd',
  height: '80%',
  max: null,
  min: 0,
  stroke: '#4d89f9',
  strokeWidth: 1,
  width: '100%'
};
