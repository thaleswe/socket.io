const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Allow Cross Domain Requests
Server.set('transports', [ 'websocket' ]);

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
});



server.listen(process.env.PORT || 5501, () => {
  console.log('listening on *:5501');
});