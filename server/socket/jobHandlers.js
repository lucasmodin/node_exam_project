import db from '../database/connection.js';
import { authorizeRoles } from '../middleware/accessControlSocket.js';
import { Roles } from '../data/roles.js';

const STAGES = ["incoming", "wash", "sterile", "ready", "delivered"];

export default function jobHandlers(io, socket) {

    const canCreateJob = authorizeRoles(
        Roles.ADMIN,
        Roles.OPERATOR,
        Roles.SUPERVISOR
    );

    const canAdvanceJob = authorizeRoles(
        Roles.ADMIN,
        Roles.SUPERVISOR
    );

    socket.on("job:create", async ({ name }) => {

        if (!canCreateJob(socket, "create job")) {
            return;
        };

        if (!name) {
            return socket.emit("system:message", {
                type: "error",
                message: "Job name is required"
            });
        }

        const result = await db.run(
            `INSERT INTO jobs (name, stage) VALUES (?, 'incoming')`, [name]
        );

        const job = {
            id: result.lastID,
            name,
            stage: "incoming"
        };

        io.emit("jobs:update", job);
    });

    socket.on("job:advance", async ({ jobId }) => {
        if (!canAdvanceJob(socket, "advance job")) {
            return;
        }

        const job = await db.get(
            `SELECT * FROM jobs WHERE id = ?`, [jobId]
        );

        if (!job) {
            return socket.emit("system:message", {
                type: "error",
                message: "Job not found"
            });
        }

        const currentIndex = STAGES.indexOf(job.stage);
        if (currentIndex === -1 || currentIndex === STAGES.length - 1) {
            return socket.emit("system:message", {
                type: "error", 
                message: "job cannot be advanced further"
            });
        }

        const nextStage = STAGES[currentIndex + 1];

        await db.run(
            `UPDATE jobs SET stage = ? WHERE id = ?`, [nextStage, jobId]
        );

        const updatedJob = { ...job, stage: nextStage};

        io.emit("jobs:update", updatedJob);
    }); 
}