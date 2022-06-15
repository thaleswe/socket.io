const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(process.env.PORT || 5501, () => {
  console.log('listening on *:5501');
});

const io = require('socket.io').listen(server);


//Allow Cross Domain Requests
io.set('transports', [ 'websocket' ]);

console.log("agr foi")