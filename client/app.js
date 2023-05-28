// Referencje do elementów HTML
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

// inicjacja nowegi klienta socketowego
const socket = io();

// Dodanie nasłuchiwacza dla socket
socket.on('message', ({ author, content }) => addMessage(author, content));

// Zmienne globalne
let userName = '';
const messages = [];

// Funkcja obsługująca formularz logowania
const login = function (e) {
  e.preventDefault();

  let userNameContent = userNameInput.value;

  if (userNameContent === '') {
    alert('Please enter your name.');
    return;
  }

  userName = userNameContent;
  console.log('userName:', userName);

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
  socket.emit('login', userName);
};

// Funkcja wysyłająca wiadomość
const sendMessage = function (e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (messageContent === '') {
    alert('Please enter a message.');
    return;
  }

  addMessage(userName, messageContent);
  socket.emit('message', { author: userName, content: messageContent });
  messageContentInput.value = '';
};

// Funkcja dodająca wiadomość
const addMessage = function (author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
  }

  if (author === 'Chat Bot') {
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

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

// Wyłączenie podpowiadania przeglądarki dla pól tekstowych
userNameInput.setAttribute('autocomplete', 'off');
messageContentInput.setAttribute('autocomplete', 'off');
