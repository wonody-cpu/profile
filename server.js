const http = require('node:http');
const { readFile, stat } = require('node:fs/promises');
const path = require('node:path');

const publicDirectory = path.join(__dirname, 'public');
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '127.0.0.1';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const requestedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    let filePath = path.resolve(publicDirectory, requestedPath);

    if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
      response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Forbidden');
      return;
    }

    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) filePath = path.join(filePath, 'index.html');

    const content = await readFile(filePath);
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    response.end(content);
  } catch (error) {
    const statusCode = error.code === 'ENOENT' ? 404 : 500;
    response.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(statusCode === 404 ? 'Not Found' : 'Internal Server Error');
  }
});

server.listen(port, host, () => {
  console.log(`Portfolio server running at http://${host}:${port}`);
});

