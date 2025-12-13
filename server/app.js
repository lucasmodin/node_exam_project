import express from 'express';
import session from 'express-session';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import 'dotenv/config';

// ------------ setup, session and rate limiting ------------

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

// ------------ routes ------------

app.use("/auth", authLimiter);

import authRouter from './routes/authRouter.js';
app.use("/auth", authRouter);

import agvRouter from './routes/agvs/agvRouter.js';
app.use("/agvs", agvRouter);

import jobRouter from './routes/jobs/jobRouter.js';
app.use("/jobs", jobRouter);

import eventsRouter from './routes/events/eventsRouter.js';
app.use("/events", eventsRouter);

// ------------ socket ------------

import { Server } from 'socket.io';
import { socketAuth } from './middleware/socketAuth.js';
import http from 'http';

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

io.use(socketAuth);

import agvHandlers from './socket/agvHandlers.js';
import jobHandlers from './socket/jobHandlers.js';
import eventHandlers from './socket/eventHandlers.js';

io.on("connection", (socket) => {

    agvHandlers(io, socket);
    jobHandlers(io, socket);
    eventHandlers(io, socket);
});

const PORT = Number(process.env.PORT) || 8080;

server.listen(PORT, () => {
    console.log("server running on port", PORT);
});