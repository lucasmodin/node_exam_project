import io from 'socket.io-client';

import { updateAgv } from '../services/agvService.js';
import { updateJob } from '../services/jobService';
import { addEvent } from '../services/eventService.js';

const socket = io(import.meta.env.VITE_BASE_URL, {
    withCredentials: true
});

socket.on("connect", () => {
    console.log("connected socket");
});

socket.on("agv:update", updateAgv);
socket.on("jobs:update", updateJob);
socket.on("events:new", addEvent);

export default socket;