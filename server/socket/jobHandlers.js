import db from '../database/connection.js';
import { authorizeRoles } from '../middleware/accessControlSocket.js';
import { Roles } from '../data/roles.js';
import { moveAgv } from './util/agvService.js';

const STAGE_TO_STATION = {
    incoming: "INCOMING",
    wash: "WASH_TABLE_1",
    sterile: "CABINET_WASHER_1",
    ready: "AGV_STATION"
}

const STAGES = ["created", "incoming", "wash", "sterile", "ready", "delivered"];


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

    socket.on("job:create", async ({ name, agvId }) => {

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
            `INSERT INTO jobs (name, stage, assigned_agv) VALUES (?, 'created', ?)`, [name, agvId]
        );

        const job = {
            id: result.lastID,
            name,
            stage: "created",
            assigned_agv: agvId
        };

        io.emit("jobs:update", job);
    });

    socket.on("job:advance", async ({ jobId }) => {
        console.log("job:advance RECEIVED", jobId);
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

        const station = STAGE_TO_STATION[nextStage];

        if (station && job.assigned_agv) {
            await moveAgv(io, job.assigned_agv, station);

            if (nextStage === "ready" || nextStage === "delivered") {
                await db.run(
                    `UPDATE agvs SET status = 'idle' WHERE id = ?`, [job.assigned_agv]
                );

                const agv = await db.get(
                    `SELECT * FROM agvs WHERE id = ?`, [job.assigned_agv]
                );

                io.emit("agv:update", agv);
            }

            
        }
    }); 
}