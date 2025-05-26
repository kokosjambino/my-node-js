import { processCommand } from './modules/commandProcessor.js';

const command = process.argv[2];
const args = process.argv.slice(3);

processCommand(command, args);
