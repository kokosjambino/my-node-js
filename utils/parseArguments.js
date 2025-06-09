export function parseArguments() {
  const args = process.argv.slice(2);
  const query = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-q') {
      query.q = args[i + 1];
      i++;
    } else if (arg === '-l') {
      query.language = args[i + 1];
      i++;
    } else if (arg === '-c') {
      query.category = args[i + 1];
      i++;
    } else if (arg === '-s') {
      const pageSize = parseInt(args[i + 1], 10);
      if (!isNaN(pageSize) && pageSize > 0) {
        query.pageSize = pageSize;
      } else {
        console.error('Ошибка: Некорректное значение для -s. Используйте положительное число.');
        process.exit(1);
      }
      i++;
    }
  }

  if (!query.pageSize) {
    query.pageSize = 10;
  }

  return query;
}