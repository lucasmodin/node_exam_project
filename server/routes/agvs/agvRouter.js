import { Router } from 'express';
import { isOperator, isSupervisor, isAdmin } from '../../middleware/accessControl.js';
import db from '../../database/connection.js';

const router = Router();

router.get("/", isOperator, async (req, res) => {
    const agvs = await db.all(
        `SELECT * FROM agvs;`
    );
    res.send({ data: agvs});
});

router.get("/:id", isOperator, async (req, res) => {
    const agv = await db.get(
        `SELECT * FROM agvs WHERE id = ?;`, [req.params.id]      
    );

    if (!agv) {
        return res.status(404).send({
            error: `No AGV with the specified id: ${req.params.id} found`
        });
    }

    res.send({ data: agv});
});

router.post("/", isAdmin, async (req, res) => {
    const { name, x = 0, y = 0 } = req.body;

    if (!name) {
        return res.status(400).send({
            error: "Name is required!"
        });
    }

    const result = await db.run(
        `INSERT INTO agvs (name, x, y, status) VALUES (?, ?, ?, 'idle');`,
        [name, x, y]
    );

    const agvToReturn = await db.get(
        `SELECT * FROM agvs WHERE id = ?`,
        [result.lastID]
    );
    
    const io = req.app.get("io");
    io.emit("agv:update", agvToReturn);

    res.status(201).send({ data: agvToReturn });
});

router.patch("/:id/status", isSupervisor, async (req, res) => {
    const { status } = req.body;
    const valid =["idle", "moving", "delivering", "error"];

    if (!valid.includes(status)) {
        return res.status(400).send({
            error: "Invalid status"
        });
    }

    await db.run(
        `UPDATE agvs SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [status, req.params.id]
    );

    const updatedAgv = await db.get(
        `SELECT * FROM agvs WHERE id = ?`, [req.params.id]
    );

    res.send({ data: updatedAgv });
})

router.delete("/:id", isAdmin, async (req, res) => {

    //traceability for jobs - for the domain, jobs need to stay
    await db.run(
        `UPDATE jobs SET assigned_agv = NULL WHERE assigned_agv = ?`, [req.params.id]
    );

    await db.run(
        `DELETE FROM agvs WHERE id = ?`, [req.params.id]
    );

    const message = `AGV-${req.params.id} removed; jobs unassigned`;
    
    const result = await db.run(
        `INSERT INTO events (agv_id, message)
        VALUES (?, ?)`,
        [req.params.id, message]
    );

    const event = await db.get(
        `SELECT * FROM events WHERE id = ?`,
        [result.lastID]
    );

    const io = req.app.get("io");
    io.emit("agv:delete", { id: req.params.id });
    io.emit("events:new", event);

    res.send({ data: "AGV has been delete"});

});

export default router;