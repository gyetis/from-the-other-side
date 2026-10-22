import path from 'node:path';
import fs from 'node:fs/promises';

export async function getData() {
    let data = [];
    try {
        const dataFile = path.join('data', 'data.json');
        const content = await fs.readFile(dataFile, 'utf8');
        data = JSON.parse(content);
    } catch (err) {
        console.error(err);
    }
    return data;
}
