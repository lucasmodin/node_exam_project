import io from 'socket.io-client';

import { updateAgv, removeAgv } from '../services/agvService.js';
import { updateJob, removeJob } from '../services/jobService.js';
import { addEvent } from '../services/eventService.js';



const socket = io(import.meta.env.VITE_BASE_URL, {
    withCredentials: true,
    autoConnect: false
});

socket.on("connect", () => {
    console.log("connected socket");
});

socket.on("agv:update", updateAgv);
socket.on("jobs:update", updateJob);
socket.on("events:new", addEvent);
socket.on("agv:delete", removeAgv);
socket.on("job:delete", removeJob);

socket.on("system:message", (msg) => {
  console.log("SYSTEM MESSAGE", msg);
});

export default socket;