export const showNews = data => {
  try {
    const jsonData = JSON.parse(data);

    if (jsonData.status === 'ok') {
      if (jsonData.articles.length === 0) {
        console.log('Новостей не найдено по вашему запросу.');
        return;
      }

      jsonData.articles.forEach((article, index) => {
        console.log(`\n--- Article ${index + 1} ---`);
        console.log(`Title: ${article.title}`);
        console.log(`Description: ${article.description || 'Нет описания'}`);
        console.log(`URL: ${article.url}`);
        console.log(`Source: ${article.source.name || 'Неизвестно'}`);
        console.log(`Published At: ${article.publishedAt}`);
      });
    } else {
      console.error('Ошибка при получении новостей:', jsonData.message);
    }
  } catch (error) {
    console.error('Ошибка при разборе JSON:', error);
  }
};