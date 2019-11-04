const fs = require('fs');
const axios = require('axios');
const exec = require('child_process').exec;
const config = require('../config/config.json');
const listeners = {};
const files = {};

function debug() {
  // debugger kasta ut saker varje sekund
  listeners.debug = setInterval(() => {
    const content = JSON.parse(fs.readFileSync(config.storageFolder + '/basic.json', 'utf8'));
    const d = new Date();
    content.basic_clock.value = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    content.basic_clock.style = 'font-size:12px;';
    content.load.values.push(Math.floor(Math.random() * 100));

    const arrLength = content.load.values.length;
    if (arrLength > 50) {
      content.load.values.splice(0, arrLength - 50);
    }

    fs.writeFileSync(config.storageFolder + '/basic.json', JSON.stringify(content));
  }, 1000);
}

function updateData(content, item, data) {
  const current = content[item.id];

  if (item.mode === 'add') {
    if (!current.values) current.values = [];
    current.values.push(data.value);

    const arrLength = current.values.length;
    if (arrLength > item.limit) {
      current.values.splice(0, arrLength - item.limit);
    }

    return current;
  }

  // Annars replace
  return data;
}

function setupTimers() {
  const collectors = config.collectors;

  Object.keys(collectors).forEach(fileName => {
    if (!listeners[fileName]) {
      listeners[fileName] = {};
      files[fileName] = {};
    }

    collectors[fileName]
      .filter(i => i.active === true)
      .forEach(item => {
        files[fileName][item.id] = JSON.parse(fs.readFileSync(config.storageFolder + '/' + fileName + '.json', 'utf8'));

        listeners[fileName][item.id] = setInterval(() => {
          console.log('Timer run', item.id);

          if (item.url) {
            getUrl(item.url, function(data) {
              //content[item.id] = data;
              files[fileName][item.id] = updateData(files[fileName], item, data);
              //fs.writeFileSync(config.storageFolder + '/' + fileName + '.json', JSON.stringify(content));
            });
          }

          if (item.command) {
            getCommand(item.command, function(data) {
              //content[item.id] = data;
              files[fileName][item.id] = updateData(files[fileName], item, data);
              //fs.writeFileSync(config.storageFolder + '/' + fileName + '.json', JSON.stringify(content));
            });
          }
        }, item.update * 1000);
      });

    listeners.save = setInterval(() => {
      //console.log('saving ' + fileName + '.json');
      fs.writeFileSync(config.storageFolder + '/' + fileName + '.json', JSON.stringify(files[fileName]));
    }, 2000);
  });
}

function getUrl(url, callback) {
  try {
    axios.get(url).then(res => {
      callback(res.data);
    });
  } catch (error) {
    console.error(error);
  }
}

function getCommand(command, callback) {
  exec(command, function(error, stdout, stderr) {
    const data = JSON.parse(stdout);
    callback(data);
  });
}

module.exports.debug = debug;
module.exports.setupTimers = setupTimers;
