const socket = io();

function joinRoom() {
    const username = prompt('Enter your username');
    const room = prompt('Enter room name');
    socket.emit('joinRoom', { username, room });
}

document.addEventListener('DOMContentLoaded', joinRoom);

const messageInput = document.getElementById('message');
const chatWindow = document.getElementById('output');

function sendMessage() {
    const msg = messageInput.value;
    const room = prompt('Enter room name');  // For simplicity in this example
    socket.emit('chatMessage', { msg, room });
    messageInput.value = '';
}

socket.on('message', (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerText = message;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
