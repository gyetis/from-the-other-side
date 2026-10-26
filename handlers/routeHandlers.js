import { v4 as uuidv4 } from 'uuid';

import { getData, sendData } from '../utils/dataOperations.js';
import { sendResponse } from '../utils/sendResponse.js';

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
        if (!story || typeof story !== 'object' || Array.isArray(story)) {
            throw new Error('Request body must be a JSON object');
        }

        story.uuid = uuidv4();
        body = JSON.stringify(story);
        await sendData(story);
        sendResponse(res, 201, 'application/json', body);
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
