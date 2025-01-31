const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        socket.to(room).emit('message', `${username} has joined the room`);
    });

    socket.on('chatMessage', ({ msg, room }) => {
        io.to(room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
