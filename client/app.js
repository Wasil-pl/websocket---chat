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

  const userNameInput = document.getElementById('username').value;

  if (userNameInput === '') {
    alert('Please enter your name.');
    return;
  }

  userName = userNameInput;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

loginForm.addEventListener('submit', login);
