export function getContentType(ext) {
    const types = {
        '.json': 'application/json',
        '.css': 'text/css',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.js': 'text/javascript',
        '.ico': 'image/ico',
    };

    return types[ext.toLowerCase()] || 'text/html';
}
