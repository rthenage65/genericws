import express, { Application } from "express";
import WebSocket from "ws";
import { createServer, Server as HTTPServer } from "http";
import { WSS } from "./wss";

const port = 5000;
const app = express();
const httpServer = createServer(app);
const wss = new WebSocket.Server({ server: httpServer });
new WSS(wss);
const hostname = "localhost";


httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
