const socket = io();
const username = prompt("Enter your username:");
const room = prompt("Enter room name:");
socket.emit('join', { username, room });

socket.on('message', function(msg) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
});

function sendMessage() {
    const message = document.getElementById('message').value;
    socket.emit('message', { message, room });
    document.getElementById('message').value = '';
}
