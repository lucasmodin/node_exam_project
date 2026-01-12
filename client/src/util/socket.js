import io from 'socket.io-client';

import { updateAgv, removeAgv } from '../services/agvService.js';
import { updateJob, removeJob } from '../services/jobService.js';
import { addEvent } from '../services/eventService.js';

import { systemMessage } from '../stores/systemMessageStore.js';

function handleSystemMessage(message) {
  systemMessage.set(message);
  setTimeout(() => systemMessage.set(null), 3000);
}


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
socket.on("system:message", handleSystemMessage)

export default socket;