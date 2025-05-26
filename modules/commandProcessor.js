import * as todoService from '../service/todoService.js';

const processCommand = (command, args) => {
  switch (command) {
    case 'help':
      console.log(`
      help                    : список команд
      add <task>              : добавить новую задачу.
      list                    : вывести список всех задач.
      get <id>                : вывести информацию о задаче с указанным идентификатором.
      update <id> <newTask>   : обновить задачу с указанным идентификатором.
      status <id> <newStatus> : обновить статус задачи с указанным идентификатором.
      delete <id>             : удалить задачу с указанным идентификатором.
    `);
      break;
    case 'add':
      if (args.length > 0) {
        const task = args.join(' ');
        todoService.addTask(task);
      } else {
        console.log('Необходимо указать задачу для добавления.');
      }
      break;
    case 'list':
      todoService.listTasks();
      break;
    case 'get':
      if (args.length > 0) {
        const id = parseInt(args[0]);
        if (!isNaN(id)) {
          todoService.getTask(id);
        } else {
          console.log('Неверный идентификатор задачи.');
        }
      } else {
        console.log('Необходимо указать идентификатор задачи.');
      }
      break;
    case 'update':
      if (args.length > 1) {
        const id = parseInt(args[0]);
        const newTask = args.slice(1).join(' ');

        if (!isNaN(id)) {
          todoService.updateTask(id, newTask);
        } else {
          console.log('Неверный идентификатор задачи.');
        }
      } else {
        console.log(
          'Необходимо указать идентификатор и новое название задачи.',
        );
      }
      break;
    case 'status':
      if (args.length > 1) {
        const id = parseInt(args[0]);
        const newStatus = args[1];

        if (!isNaN(id)) {
          todoService.updateTaskStatus(id, newStatus);
        } else {
          console.log('Неверный идентификатор задачи.');
        }
      } else {
        console.log('Необходимо указать идентификатор и новый статус задачи.');
      }
      break;
    case 'delete':
      if (args.length > 0) {
        const id = parseInt(args[0]);
        console.log('id: ', id);
        if (!isNaN(id)) {
          todoService.deleteTask(id);
        } else {
          console.log('Неверный идентификатор задачи.');
        }
      } else {
        console.log('Необходимо указать идентификатор задачи.');
      }
      break;
    default:
      console.log('Неверная команда');
  }
};

export { processCommand };
