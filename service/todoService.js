import fs from 'fs';

const DATA_FILE = 'homedir/todos.json';
let tasks = [];

const loadTasks = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      tasks = JSON.parse(data);
    } else {
      tasks = [];
      saveTasks();
    }
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error);
  }
};

const saveTasks = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (error) {
    console.error('Ошибка при сохранении задач:', error);
  }
};

const addTask = task => {
  loadTasks();
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  console.log('tasks.length: ', tasks.length);
  const newTask = { id: id, name: task, status: 'В работе' };
  tasks.push(newTask);
  saveTasks();
  console.log(`Задача добавлена с идентификатором ${id}`);
};

const listTasks = () => {
  loadTasks();
  if (tasks.length === 0) {
    console.log('Список задач пуст.');
  } else {
    console.log('Список задач:');
    tasks.forEach(task => {
      console.log(`${task.id}. [${task.status}] ${task.name}`);
    });
  }
};

const getTask = id => {
  loadTasks();
  const task = tasks.find(task => task.id === id);
  if (task) {
    console.log(`Задача с идентификатором ${id}:`);
    console.log(`  Название: ${task.name}`);
    console.log(`  Статус: ${task.status}`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена.`);
  }
};

const updateTask = (id, newTaskName) => {
  loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].name = newTaskName;
    saveTasks();
    console.log(`Задача с идентификатором ${id} обновлена`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена.`);
  }
};

const updateTaskStatus = (id, newStatus) => {
  loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    saveTasks();
    console.log(`Статус задачи с идентификатором ${id} обновлён`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена.`);
  }
};

const deleteTask = id => {
  loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    console.log(`Задача с идентификатором ${id} удалена`);
  } else {
    console.log(`Задача с идентификатором ${id} не найдена.`);
  }
};

loadTasks();

export {
  addTask,
  listTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
