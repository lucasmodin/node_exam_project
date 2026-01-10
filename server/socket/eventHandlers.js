import db from '../database/connection.js';
import { authorizeRoles } from '../middleware/accessControlSocket.js';
import { Roles } from '../data/roles.js';

export default function eventHandlers(io, socket) {
    
    const canAddEvent = authorizeRoles(
        Roles.ADMIN,
        Roles.SUPERVISOR
    );

    socket.on("event:add", async ({ jobId, agvId, message }) => {

        if (!canAddEvent(socket, "add event")) {
            return;
        }

        if (!message) {
            return socket.emit("system:message", {
                type: "error", 
                message: "Event message is required"
            });
        }

        const result = await db.run(
            `INSERT INTO events (job_id, agv_id, message)
            VALUES (?, ?, ?)`,
            [jobId, agvId, message]
        );

        const event = await db.get(
            `SELECT * events WHERE id = ?`,
            [result.lastID]
        );

        io.emit("events:new", event);
    });
}