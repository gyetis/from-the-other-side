import { v4 as uuidv4 } from 'uuid';

import { storyEvents } from '../events/storyEvents.js';
import { getData, sendData } from '../utils/dataOperations.js';
import { sendResponse } from '../utils/sendResponse.js';
import { sanitizeInput } from '../utils/sanitizeInput.js';
import { stories } from '../data/news.js';

export async function handleGet(res) {
    const data = await getData();
    sendResponse(res, 200, 'application/json', JSON.stringify(data));
}

export async function handlePost(res, req) {
    try {
        let body = '';
        for await (const chunk of req) {
            body += chunk;
        }
        const story = JSON.parse(body);
        story.uuid = uuidv4();
        const sanitizedBody = sanitizeInput(story);
        await sendData(sanitizedBody);
        storyEvents.emit('story-added', sanitizedBody);
        sendResponse(
            res,
            201,
            'application/json',
            JSON.stringify(sanitizedBody)
        );
    } catch (err) {
        console.error(err);
        sendResponse(
            res,
            400,
            'application/json',
            JSON.stringify({ error: 'Invalid JSON request body' })
        );
    }
}

export async function handleNews(req, res) {
    try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        setInterval(() => {
            let randomIndex = Math.floor(Math.random() * stories.length);
            res.write(
                `data: ${JSON.stringify({ event: 'news-update', story: stories[randomIndex] })}\n\n`
            );
        }, 3000);
    } catch (err) {
        console.error(err);
        sendResponse(
            res,
            500,
            'application/json',
            JSON.stringify({ error: 'Failed to read news data' })
        );
    }
}
