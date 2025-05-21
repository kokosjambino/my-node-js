// Задание 1

import { Buffer } from 'node:buffer';

const textToBuffer = (text, encoding) => {
  try {
    return Buffer.from(text, encoding);
  } catch (error) {
    console.error(`Ошибка при кодировании текста в ${encoding}:`, error);
    return null;
  }
};

const bufferToText = (buffer, encoding) => {
  try {
    return buffer.toString(encoding);
  } catch (error) {
    console.error(`Ошибка при декодировании буфера в ${encoding}:`, error);
    return null;
  }
};

const text = 'Привет мир!';

const utf8Buffer = textToBuffer(text, 'utf-8');
console.log('utf8Buffer: ', utf8Buffer);

const base64String = bufferToText(utf8Buffer, 'base64');
console.log('base64String:', base64String);

const base64Buffer = textToBuffer(base64String, 'base64');
console.log('base64Buffer:', base64Buffer);

const decodedText = bufferToText(base64Buffer, 'utf-8');
console.log('decodedText: ', decodedText);

// Задание #2

import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';

async function mergeTextFiles(directoryPath, outputFilename) {
  try {
    const writeStream = createWriteStream(outputFilename);

    const files = await readdir(directoryPath);

    const txtFiles = files.filter(file => file.endsWith('.txt'));

    for (const file of txtFiles) {
      const filePath = `${directoryPath + '/' + file}`;
      const readStream = createReadStream(filePath);

      readStream.on('data', chunk => {
        writeStream.write(`[${file.replace('.txt', '')}]\n`);
        writeStream.write(chunk);
      });
    }
  } catch (error) {
    console.error('Ошибка при объединении файлов:', error);
  }
}

const directoryPath = './files';
const outputFilename = './combined.txt';
mergeTextFiles(directoryPath, outputFilename);

// Задание 3

// import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import sharp from 'sharp';

const resizeImage = async (inputPath, outputPath) => {
  const rStream = createReadStream(inputPath);
  const wStream = createWriteStream(outputPath);
  const resized = sharp().resize(400, 400).toFormat('jpeg');
  try {
    await pipeline(rStream, resized, wStream);
  } catch (err) {
    console.error(err);
  }
};

resizeImage('./files/screen-7.jpg', './files/resized.jpg');

const colorImage = async (inputPath, outputPath) => {
  const rStream = createReadStream(inputPath);
  const wStream = createWriteStream(outputPath);
  const changeColor = sharp().grayscale().blur(10).toFormat('jpeg');
  try {
    await pipeline(rStream, changeColor, wStream);
  } catch (err) {
    console.error(err);
  }
};

colorImage('./files/screen-7.jpg', './files/changeColor.jpg');
