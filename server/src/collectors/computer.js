var os = require('os');
const today = new Date();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

// console.log(os.cpus());
// console.log(os.totalmem());
// console.log(os.freemem());

var cpus = os.cpus();
var labels = [];
var values = [];

for (var i = 0, len = cpus.length; i < len; i++) {
  //console.log('CPU %s:', i);
  //   labels.push('CPU '+ i);

  var cpu = cpus[i],
    total = 0;

  for (var type in cpu.times) {
    total += cpu.times[type];
  }

  for (type in cpu.times) {
    //labels.push('CPU ' + i + ':' + type);
    values.push(['CPU ' + i + ':' + type, Math.round((100 * cpu.times[type]) / total)]);
    //console.log('\t', type, Math.round((100 * cpu.times[type]) / total));
  }
}

console.log(
  JSON.stringify({
    id: 'computer',
    title: 'Datamaskin',
    subtitle: 'cpu',
    icon: 'fa fa-computer',
    type: 'table',
    size: {
      x: 1,
      y: 3
    },
    labels: ['typ', 'värde'],
    values: values,
    updated_at: time
  })
);
