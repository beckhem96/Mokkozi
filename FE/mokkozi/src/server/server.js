const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');
const handleListen = () => console.log(`Listning on http://localhost:8080`);

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', function (res, req) {
  req.sendFile(path.join(__dirname, '../../public/index.html'));
});

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

wsServer.on('connection', (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Envet: ${event}`);
  });
  socket.on('join_room', (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });
  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('answer', offer);
  });
});
httpServer.listen(8080, handleListen);
