const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');

const messages = [];
let users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => console.log('Server is running on port 8000'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('login', (name) => {
    const user = { name, id: socket.id };
    users.push(user);
    console.log('New user logged in:', user);
    console.log('users:', users);
  });

  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      const user = users[index];
      users.splice(index, 1);
      console.log('User disconnected:', user);
    }
  });

  console.log("I've added a listener on message event \n");
});

app.use((req, res) => res.status(404).send('404 not found...'));
