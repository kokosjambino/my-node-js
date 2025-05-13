// задание 1

import { EventEmitter } from 'node:events';

class EventTimer extends EventEmitter {}

const eventTimer = new EventTimer();

eventTimer.addListener('timer', () => {
  let second = 0;
  const interval = setInterval(() => {
    second++;
    console.log(`Tick - ${second}`);
    if (second === 8) {
      clearInterval(interval);
    }
  }, 1000);
});

eventTimer.emit('timer');

// задание 2

class EventMessage extends EventEmitter {}

const eventMessage = new EventMessage();

function sendMessage(username, message) {
  eventMessage.emit('processMessage', username, message);
}

function receiveMessage() {
  eventMessage.addListener('processMessage', (username, message) => {
    console.log(`Пользователь ${username} отправил сообщение ${message}`);
  });
}

receiveMessage();

sendMessage('Алиса', 'Привет всем!');
sendMessage('Борис', 'Привет , рад тебя видеть ');
sendMessage('Денис', 'У нас всё работает?');
sendMessage('Алиса', 'Да , на 5 баллов!');
