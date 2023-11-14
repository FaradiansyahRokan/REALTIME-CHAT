"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const port = 3306;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on('connection', socket => {
    console.log('Connect');
    socket.on('send', ({ sender, message }) => {
        io.emit('receive', { sender, message });
    });
    socket.on('notification', (user) => {
        socket.broadcast.emit('notification', user);
    });
});
app.get('/chat', (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, '../', './public', './chat.html'));
});
app.get('/', (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, '../', './public', './username.html'));
})
    , server.listen(port, () => {
        console.log('http://localhost:' + port);
    });
