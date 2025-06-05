import https from 'https';
import http from 'http';
import { URL } from 'url';

export async function fetchData(urlString) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(urlString);
        const httpModule = parsedUrl.protocol === 'https:' ? https : http;

        httpModule.get(parsedUrl, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });

        }).on('error', (err) => {
            reject(err);
        });
    });
}
