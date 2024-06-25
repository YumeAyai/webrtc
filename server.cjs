const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const senderWs = new WebSocket.Server({ noServer: true });
const receiverWs = new WebSocket.Server({ noServer: true });

senderWs.on('connection', (ws) => {
  console.log('Sender connected');

  ws.on('message', (message) => {
    // 处理从 senderWs 接收到的消息
    // 读取message为string
    message = message.toString();
    console.log('Received message from sender:', message);
    // 转发消息给 receiverWs
    receiverWs.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Sender disconnected');
  });
});

receiverWs.on('connection', (ws) => {
  console.log('Receiver connected');

  ws.on('message', (message) => {
    // 处理从 receiverWs 接收到的消息
    // 读取message为string
    message = message.toString();
    console.log('Received message from receiver:', message);
    // 转发消息给 senderWs
    senderWs.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Receiver disconnected');
  });
});

server.on('upgrade', (request, socket, head) => {
  const pathname = request.url;

  if (pathname === '/sender') {
    senderWs.handleUpgrade(request, socket, head, (ws) => {
      senderWs.emit('connection', ws, request);
    });
  } else if (pathname === '/receiver') {
    receiverWs.handleUpgrade(request, socket, head, (ws) => {
      receiverWs.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});