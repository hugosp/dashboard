const socketio = require('socket.io');
const config = require('./config/config.json');

// Starta server
const io = socketio.listen(config.port);

const eventServer = require('./src/eventServer');
const socketServer = require('./src/socketServer')(io);

//eventServer.debug();
eventServer.setupTimers();
