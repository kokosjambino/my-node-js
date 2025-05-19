// Задание 1

import fs from 'node:fs/promises';

async function copyDirectory(sourceDir, targetDir, callback) {
  let errorMessage = null;
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourcePath = sourceDir + '/' + file;
      const targetPath = targetDir + '/' + file;

      const stat = await fs.stat(sourcePath);

      if (stat.isDirectory()) {
        await copyDirectory(sourcePath, targetPath, callback);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (err) {
    errorMessage = err;
    throw err;
  }

  callback(errorMessage);
}

async function runTest() {
  const testDir = 'testDir';
  const copyDir = 'copyDir';

  try {
    await copyDirectory(testDir, copyDir, onError);
  } catch (error) {
    console.error('Возникла ошибка при копировании', error);
  }
}

function onError(err) {
  if (err) {
    console.log('err: ', err);
  }
}

runTest();

// Задание №2

import { EventEmitter } from 'node:events';
import { appendFile, stat, truncate, copyFile } from 'node:fs/promises';

class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }

  log(message) {
    this.logQueue.unshift(message);
    if (!this.writing) {
      this.writing = true;
      this.writeLog();
    }
  }

  async writeLog() {
    if (this.logQueue.length === 0) {
      this.writing = false;
      return;
    }

    const messagesToWrite = [...this.logQueue];
    this.logQueue = [];
    this.emit('messageLogged', messagesToWrite);

    try {
      await appendFile(this.filename, messagesToWrite.join('\n') + '\n');

      await this.checkFileSize();
    } catch (err) {
      console.error('Ошибка при записи в файл', err);
      this.emit('error', err);
    } finally {
      if (this.logQueue.length > 0) {
        this.writeLog();
      } else {
        this.writing = false;
      }
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.filename);
      return stats.size;
    } catch (err) {
      console.error('Ошибка при получении размера файла', err);
      return 0;
    }
  }

  async checkFileSize() {
    const fileSize = await this.getFileSize();
    if (fileSize > this.maxSize) {
      await this.rotateLog();
    }
  }

  async rotateLog() {
    const backupFilename = this.filename + '.bak';

    try {
      this.emit('rotate', this.filename, backupFilename);
    } catch (err) {
      console.error('Ошибка при ротации лога', err);
      this.emit('error', err);
    }
  }
}

// Проверка работы
const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.on('rotate', async (oldFilename, newFilename) => {
  try {
    await copyFile(oldFilename, newFilename);
    console.log(`Файл ${oldFilename} ротирован в ${newFilename}`);
    await truncate(oldFilename, 0);
    console.log(`Файл ${oldFilename} очищен`);
  } catch (err) {
    console.error('Ошибка при копировании или обрезке файла:', err);
    logger.emit('error', err);
  }
});

logger.on('error', err => {
  console.error('Ошибка:', err);
});

logger.log('Первое сообщение');

logger.log('Второе сообщение');

// Функция для генерации большого количества логов, чтобы вызвать ротацию
function generateLotsOfLogs() {
  for (let i = 0; i < 150; i++) {
    logger.log(`Лог сообщение ${i}`);
  }
}

generateLotsOfLogs();
