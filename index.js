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

eventMessage.on('error', errMessage => {
  console.log(errMessage);
});

function sendMessage(username, message) {
  if (!username || !message) {
    eventMessage.emit(
      'error',
      new Error(
        'Имя пользователя и сообщение обязательны. Сообщение не было отправлено',
      ),
    );
    return;
  }
  eventMessage.emit('processMessage', { username, message });
}

function receiveMessage() {
  eventMessage.on('processMessage', messageData => {
    console.log(
      `Пользователь ${messageData.username} отправил сообщение ${messageData.message}`,
    );
  });
}

receiveMessage();

sendMessage('Алиса', 'Привет всем!');
// Для проверки, что код не падает при ошибке
sendMessage('', 'Привет всем!');
sendMessage('Алиса', '');
//
sendMessage('Борис', 'Привет , рад тебя видеть ');
sendMessage('Денис', 'У нас всё работает?');
sendMessage('Алиса', 'Да , на 5 баллов!');
