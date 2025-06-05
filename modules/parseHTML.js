export function parseHTML(html) {
    let headingCount = 1;
    let linkCount = 1;

    const headingRegex = /<(h[1-6])>(.*?)<\/\1>/gi; // Поиск h1-h6
    const linkRegex = /<a.*?href=["'](.*?)["'].*?>(.*?)<\/a>/gi; // Поиск <a>

    let match;

    while ((match = headingRegex.exec(html)) !== null) {
        const headingTag = match[1];
        const headingText = match[2].trim();
        console.log(`${headingCount++}. Заголовок (${headingTag}): ${headingText}`);
    }

    while ((match = linkRegex.exec(html)) !== null) {
        const linkURL = match[1];
        const linkText = match[2].trim();
        console.log(`${linkCount++}. Ссылка: URL: ${linkURL}, Текст: ${linkText}`);
    }
}
