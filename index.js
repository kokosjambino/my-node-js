import * as readline from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import process from 'node:process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = (str) => {
  process.stdout.write(str);
};

async function findAndReplace() {
  const findDir = await rl.question('Введите путь к директории: ');
  if (!findDir.trim()) {
    write('Не указана директория поиска\n');
    rl.close();
    return;
  }
  const findStr = await rl.question('Введите строку для поиска: ');
  const newStr = await rl.question('Введите строку для замены: ');


  try {
    await processDirectory(findDir, findStr, newStr);
    console.log('Замена завершена успешно.');
  } catch (error) {
    write(`Произошла ошибка: ${error}\n`);
  } finally {
    rl.close();
  }
}

async function processDirectory(sourceDir, findStr, newStr) {
  try {
    const folderList = await fs.readdir(sourceDir);

    for (const item of folderList) {
      const itemPath = path.join(sourceDir, item);
      const stats = await fs.stat(itemPath);

      if (stats.isFile() && path.extname(item).toLowerCase() === '.txt') {
        await replaceTextInFile(itemPath, findStr, newStr);
      } else if (stats.isDirectory()) {
        await processDirectory(itemPath, findStr, newStr);
      }
    }
  } catch (error) {
    throw new Error(`Ошибка при обработке директории ${sourceDir}: ${error.message}`);
  }
}

async function replaceTextInFile(filePath, findStr, newStr) {
  try {
    const fileTxt = await fs.readFile(filePath, { encoding: 'utf-8' });
    const newFileTxt = fileTxt.replaceAll(findStr, newStr);
    if (fileTxt !== newFileTxt) {
      await fs.writeFile(filePath, newFileTxt);
      console.log(`Замена выполнена в файле: ${path.basename(filePath)}`);
    } else {
      console.log(`В файле ${path.basename(filePath)} строка "${findStr}" не найдена.`);
    }

  } catch (error) {
    throw new Error(`Ошибка при обработке файла ${path.basename(filePath)}: ${error.message}`);
  }
}

findAndReplace();
