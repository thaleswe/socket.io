const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');
const path = require('path');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

app.post('/logs', bodyParser.raw({type: "*/*"}),(request, response) => {
  const logs = (request.body).toString();

  console.log("chegou");
  console.log(logs)
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