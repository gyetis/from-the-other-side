import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import { handleGet, handlePost } from './handlers/routeHandlers.js';

const PORT = 3000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname);
    } else if (req.url.startsWith('/api')) {
        if (req.method === 'GET') {
            return await handleGet(res);
        } else if (req.method === 'POST') {
            return await handlePost(res, req);
        }
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
