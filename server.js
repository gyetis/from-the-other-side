import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './public/utils/getContentType.js';
import { sendResponse } from './public/utils/sendResponse.js';

const PORT = 3000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    const publicDir = path.join(__dirname, 'public');
    try {
        const pathToResource = path.join(
            publicDir,
            req.url === '/' ? 'index.html' : req.url
        );
        const ext = path.extname(pathToResource);
        const contentType = getContentType(ext);
        const content = await fs.readFile(pathToResource);
        sendResponse(res, 200, contentType, content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            const pathToError = path.join(publicDir, '404.html');
            const content = await fs.readFile(pathToError);
            sendResponse(res, 404, 'text/html', content);
        } else {
            const content = `<html><h1>Server Error: ${err.code}</h1></html>`;
            sendResponse(res, 500, 'text/html', content);
        }
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
