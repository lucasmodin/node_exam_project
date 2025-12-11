import express from 'express';
import session from 'express-session';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';


const app = express();
app.use(express.json());

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});

app.use(generalLimiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

app.use("/auth", authLimiter);

import authRouter from './routes/authRouter.js';
app.use("/auth", authRouter);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
    const user = socket.request.session.user;
    if (!user) {
        return socket.disconnect();
    }
});

const PORT = Number(process.env.PORT) || 8080;

server.listen(PORT, () => {
    console.log("server running on port", PORT);
});