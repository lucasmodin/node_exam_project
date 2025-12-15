import db from '../database/connection.js';
import { stations } from '../data/grid.js';
import { authorizeRoles } from '../middleware/accessControlSocket.js';
import { Roles } from '../data/roles.js';

export default function agvHandlers(io, socket) {

    const canMoveAgv = authorizeRoles(
        Roles.ADMIN,
        Roles.SUPERVISOR,
        Roles.OPERATOR
    );

    socket.on("agv:goToStation", async ({ agvId, station }) => {

        if (!canMoveAgv(socket, "move AGV")) {
            return;
        }

        if (!stations[station]) {
            return socket.emit("system:message", {
                type: "error", 
                message: "Invalid station"
            });
        }

        const { x, y } = stations[station];

        await db.run(
            `
            UPDATE agvs
            SET x = ?, y = ?, status = 'moving', updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [x, y, agvId]
        );

        const updatedAgv = await db.get(
            `SELECT * FROM agvs WHERE id = ?`, [agvId]
        );

        io.emit("agv:update", updatedAgv);

        await db.run(
            `INSERT INTO events (agv_id, message) VALUES (?,?)`,
            [agvId, `AGV-${agvId} sent to ${station}`]
        );

        io.emit("events:new", {
            agv_id: agvId,
            message: `AGV-${agvId} sent to ${station}`
        });
    });
}
