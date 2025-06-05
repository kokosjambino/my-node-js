import { fetchData } from './modules/fetchData.js';
import { parseHTML } from './modules/parseHTML.js';

const urlToParse = 'https://www.example.com';

async function main() {
    try {
        const htmlContent = await fetchData(urlToParse);
        parseHTML(htmlContent);
    } catch (error) {
        console.error('Ошибка при получении или обработке данных:', error);
    }
}

main();
