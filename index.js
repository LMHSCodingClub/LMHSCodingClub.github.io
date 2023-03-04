const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    let fileUrl = req.url === '/' ? '/pages/index.html' : req.url;
    const ext = path.extname(fileUrl);
    let contentType = 'text/html';
    let filePath = path.join(__dirname, fileUrl);

    if (!ext) {
        filePath += '.html';
        fileUrl += '.html';
    } else {
        contentType = `text/${ext.substring(1)}`;
    }

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 Page not found</h1><p>Cannot find ${fileUrl}</p>`);
        } else {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>500 Internal server error</h1><p>${error.message}</p>`);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
