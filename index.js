import { getNews } from './modules/getNews.js';
import { parseArguments } from './utils/parseArguments.js';

async function main() {
  const query = parseArguments();
  await getNews(query);
}

main();