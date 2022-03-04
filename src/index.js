const express = require("express");
const WebSocket = require("ws");
const { createServer } = require("http");
const { WSS } = require("./wss");

const fs = require('fs');
const options = {
//    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
}

const port = 3000;
const hostname = "0.0.0.0";
const app = express();
const httpServer = createServer(options,app);
const wsserver = new WebSocket.Server({ server: httpServer });
new WSS(wsserver);


httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
