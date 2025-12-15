import db from '../../database/connection.js';
import { stations } from '../../data/grid.js';

export async function moveAgv(io, agvId, station) {
    if (!stations[station]) {
        return;
    }

    const { x, y } = stations[station];

    await db.run(
        `UPDATE agvs
         SET x = ?, y = ?, status = 'moving', updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [x, y, agvId]
    );

    const agv = await db.get(
        `SELECT * FROM agvs WHERE id = ?`,
        [agvId]
    );

    io.emit("agv:update", agv);

    await db.run(
        `INSERT INTO events (agv_id, message)
         VALUES (?, ?)`,
        [agvId, `AGV-${agvId} sent to ${station}`]
    );

    io.emit("events:new", {
        agv_id: agvId,
        message: `AGV-${agvId} sent to ${station}`
    });
}