const fs = require('fs');
const config = require('../config/config.json');

const filesToWatch = fs.readdirSync(config.storageFolder);
const clients = {};

function onChat(val) {
  const content = JSON.parse(fs.readFileSync(config.storageFolder + '/messages.json', 'utf8'));
  content.chat.values.push({
    message: val
  });

  const arrLength = content.chat.values.length;
  if (arrLength > 10) {
    content.chat.values.splice(0, arrLength - 10);
  }

  fs.writeFileSync(config.storageFolder + '/messages.json', JSON.stringify(content));
}

function updateObject(file) {
  const content = JSON.parse(fs.readFileSync(config.storageFolder + '/' + file, 'utf8'));

  return {
    type: file.replace('.json', ''),
    clients: Object.keys(clients),
    content: content
  };
}

function setupWatch(io) {
  // Kolla alla filer i storage efter ändringar
  filesToWatch.forEach(function(file) {
    fs.watchFile(
      config.storageFolder + '/' + file,
      {
        persistent: true,
        interval: 100
      },
      function(data) {
        io.emit('update', updateObject(file));
      }
    );
  });
}

function onConnection(socket) {
  console.log('a user connected: ' + socket.id);
  clients[socket.id] = socket;

  // Skicka alla filer som start
  filesToWatch.forEach(function(file) {
    socket.emit('update', updateObject(file));
  });
}

function onDisconnect(socket) {
  console.log('user disconnected: ' + socket.id);
  delete clients[socket.id];
}

module.exports = function(io) {
  setupWatch(io);

  io.on('connection', function(socket) {
    onConnection(socket);

    socket.on('disconnect', function() {
      onDisconnect(socket);
    });

    socket.on('chat', onChat);
  });
};
