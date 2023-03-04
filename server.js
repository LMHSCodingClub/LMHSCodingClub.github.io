const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'pages/index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, try to serve corresponding html file
                filePath = path.join(__dirname, 'pages', req.url + '.html');
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            // File not found, send 404
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.end('<h1>404 Not Found</h1>');
                        } else {
                            // Some other error, send 500
                            res.writeHead(500);
                            res.end(`Server Error: ${error.code}`);
                        }
                    } else {
                        // Found corresponding html file, send content
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Some other error, send 500
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Found file, send content
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
