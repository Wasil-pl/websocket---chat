// Referencje do elementów HTML
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

// Zmienne globalne
let userName = '';
const messages = [];

// Funkcja obsługująca formularz logowania
const login = function (e) {
  e.preventDefault();

  if (userNameInput.value === '') {
    alert('Please enter your name.');
    return;
  }

  userName = userNameInput;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

loginForm.addEventListener('submit', login);

// Funkcja wysyłająca wiadomość
const sendMessage = function (e) {
  e.preventDefault();

  if (messageContentInput.value === '') {
    alert('Please enter a message.');
    return;
  }

  addMessage(userName, messageContentInput.value);
  messageContentInput.value = '';
};

addMessageForm.addEventListener('submit', sendMessage);

// Funkcja dodająca wiadomość
const addMessage = function (author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
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
