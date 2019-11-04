const today = new Date();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

console.log(
  JSON.stringify({
    id: 'load',
    title: 'Load',
    subtitle: 'LineloadChart',
    icon: 'fa fa-hourglass',
    type: 'line',
    size: {
      x: 5,
      y: 1
    },
    value: Math.random() * 100,
    updated_at: time
  })
);
