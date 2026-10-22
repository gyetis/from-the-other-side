import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getContentType } from './public/utils/getContentType.js';

const PORT = 3000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    const publicDir = path.join(__dirname, 'public');
    const pathToResource = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    );
    const ext = path.extname(pathToResource);
    const contentType = getContentType(ext);
    try {
        if (req.url === '/favicon.ico') {
            res.writeHead(204);
            res.end();
            return;
        }
        const content = await fs.readFile(pathToResource);
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
