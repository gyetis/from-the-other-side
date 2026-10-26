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

export async function sendData(dataToUpload) {
    try {
        let allData = await getData();
        allData.push(dataToUpload);
        const dataFile = path.join('data', 'data.json');
        await fs.writeFile(dataFile, JSON.stringify(allData, null, 4), 'utf8');
        return dataToUpload;
    } catch (err) {
        console.error(err);
    }
}
