import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("server running on port", PORT);
});