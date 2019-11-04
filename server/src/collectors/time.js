const today = new Date();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

console.log(
  JSON.stringify({
    id: 'basic_clock',
    title: 'Clock',
    subtitle: 'Tid är de',
    icon: 'fa fa-time',
    type: 'value',
    size: {
      x: 1,
      y: 1
    },
    value: time,
    updated_at: time
  })
);
