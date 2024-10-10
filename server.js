const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    socket.on('join', ({ username, room }) => {
        socket.join(room);
        socket.to(room).emit('message', `${username} has entered the room.`);
    });

    socket.on('leave', ({ username, room }) => {
        socket.leave(room);
        socket.to(room).emit('message', `${username} has left the room.`);
    });

    socket.on('message', ({ message, room }) => {
        io.to(room).emit('message', message);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
