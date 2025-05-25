import readline from 'node:readline';
import process from 'node:process';
import fs from 'node:fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionsFilePath = 'question.json';
let questions = [];

try {
  const data = fs.readFileSync(questionsFilePath, 'utf8');
  questions = JSON.parse(data);
} catch (error) {
  console.error(`Ошибка при чтении файла с вопросами: ${error.message}`);
  process.exit(1);
}

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let answers = new Array(questions.length).fill(null);

const GREEN_BG = '\x1b[42m'; // Зеленый фон
const RED_BG = '\x1b[41m'; // Красный фон
const GREEN_TEXT = '\x1b[32m'; // Зеленый текст
const RED_TEXT = '\x1b[31m'; // Красный текст
const BLUE_TEXT = '\x1b[34m'; // Синий текст
const RESET = '\x1b[0m';
const DEFAULT_BG = '\x1b[49m'; //Сбрасываем цвет фона

const displayProgressBar = () => {
  let progressBar = '';

  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === true) {
      progressBar += GREEN_BG + ' ' + RESET;
    } else if (answers[i] === false) {
      progressBar += RED_BG + ' ' + RESET;
    } else {
      progressBar += DEFAULT_BG + ' ' + RESET;
    }
  }

  console.log(`Вопросов: ${currentQuestionIndex} из ${questions.length}`);
  console.log(`${progressBar}`);
};

const askQuestion = () => {
  if (currentQuestionIndex >= questions.length) {
    console.log('\nКвиз завершен!');
    console.log(
      `Вы ответили правильно на ${correctAnswersCount} из ${questions.length} вопросов.`,
    );
    displayProgressBar();
    rl.close();
    process.exit(0);
  }

  const question = questions[currentQuestionIndex];

  displayProgressBar();

  console.log(
    `${GREEN_TEXT}Вопрос ${currentQuestionIndex + 1}: ${question.question}${RESET}`,
  );
  for (let i = 0; i < question.options.length; i++) {
    console.log(`${i + 1}. ${question.options[i]}`);
  }

  rl.question('Введите номер вашего ответа: ', answer => {
    const answerNumber = parseInt(answer, 10);

    if (
      isNaN(answerNumber) ||
      answerNumber < 1 ||
      answerNumber > question.options.length
    ) {
      console.log(
        'Некорректный ввод. Пожалуйста, введите число от 1 до ' +
          question.options.length,
      );
      askQuestion();
      return;
    }

    console.log(`${BLUE_TEXT}Ваш ответ: ${answerNumber}${RESET}`);

    let isCorrect = answerNumber - 1 === question.correctIndex;
    if (isCorrect) {
      console.log(`${GREEN_TEXT}Правильный ответ!${RESET}`);
      correctAnswersCount++;
      answers[currentQuestionIndex] = true;
    } else {
      console.log(`${RED_TEXT}Неправильный ответ!${RESET}`);
      answers[currentQuestionIndex] = false;
    }

    currentQuestionIndex++;
    askQuestion();
  });
};

console.log('');
console.log(
  'Добро пожаловать в Квиз! Ответьте на вопросы, вводя номер выбранного варианта ответа от 1 до 3.',
);

askQuestion();
