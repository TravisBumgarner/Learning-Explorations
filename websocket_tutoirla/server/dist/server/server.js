"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
function createMessage(content, sender) {
    return JSON.stringify(new Message(content, sender));
}
class Message {
    constructor(content, sender) {
        this.content = content;
        this.sender = sender;
    }
}
exports.Message = Message;
wss.on('connection', (ws) => {
    const extWs = ws;
    extWs.isAlive = true;
    ws.on('pong', () => {
        extWs.isAlive = true;
    });
    //connection is up, let's add a simple simple event
    ws.on('message', (msg) => {
        const message = JSON.parse(msg);
        console.log(message);
        setTimeout(() => {
            wss.clients
                .forEach(client => {
                client.send(createMessage(message.content, message.sender));
            });
        }, 1000);
    });
    //send immediatly a feedback to the incoming connection    
    ws.send(createMessage('Connected', 'Server'));
    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});
setInterval(() => {
    wss.clients.forEach((ws) => {
        const extWs = ws;
        if (!extWs.isAlive)
            return ws.terminate();
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 10000);
//start our server
server.listen(5000, () => {
    console.log(`Server started on port 5000`);
});
//# sourceMappingURL=server.js.map