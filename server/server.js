const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, ".env")});

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);