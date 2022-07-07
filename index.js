const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

app.post('/logs', bodyParser.raw({type: "*/*"}),(request, response) => {
  const jsonString_data = (request.body).toString();
  const pageData = JSON.parse(jsonString_data);

  io.emit('chat message', pageData.logs);
});

io.on("connection", (socket) => {
    console.log("a user connected")

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('command browser', (command) => {
      io.emit('command browser', command);
    });

    socket.on("chip connection", (data) => {
      console.log(data);
      io.emit("reveal chip", data);

      socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        
        io.emit("disconnect chip", {chip: data.chip, socket_id: socket.id})
      });
    });
});



server.listen(process.env.PORT || 5501, () => {
  console.log('listening on *:5501');
});