const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));

let userName = '';
const messages = [];

const handleLogin = function (e) {
  e.preventDefault();

  const userNameContent = userNameInput.value;

  if (userNameContent === '') {
    alert('Please enter your name.');
    return;
  }

  userName = userNameContent;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
  socket.emit('login', userName);
};

const sendMessage = function (e) {
  e.preventDefault();

  const messageContent = messageContentInput.value;

  if (messageContent === '') {
    alert('Please enter a message.');
    return;
  }

  addMessage(userName, messageContent);
  socket.emit('message', { author: userName, content: messageContent });
  messageContentInput.value = '';
};

const addMessage = function (author, content) {
  const chatBotName = 'Chat Bot';

  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
  }

  if (author === chatBotName) {
    message.classList.add('message--chat-bot');
  }

  const header = document.createElement('h3');
  header.classList.add('message__author');
  header.innerText = author === userName ? 'You' : author;
  message.appendChild(header);

  const messageContent = document.createElement('div');
  messageContent.classList.add('message__content');
  messageContent.innerText = content;
  message.appendChild(messageContent);

  messagesList.appendChild(message);
};

const preventAutocomplete = function () {
  userNameInput.setAttribute('autocomplete', 'off');
  messageContentInput.setAttribute('autocomplete', 'off');
};

loginForm.addEventListener('submit', handleLogin);
addMessageForm.addEventListener('submit', sendMessage);
preventAutocomplete();
