import { Router } from 'express';
import db from '../../database/connection.js';
import { isOperator, isAdmin, isSupervisor } from '../../middleware/accessControl.js';

const router = Router();

router.get("/", isOperator, async (req, res) => {
    const jobs = await db.all(
        `SELECT * FROM jobs ORDER BY created_at DESC`
    );

    res.send({ data: jobs});
});

router.get("/:id", isOperator, async (req, res) => {
    const job = await db.get(
        `SELECT * FROM jobs WHERE id = ?`, 
        [req.params.id]
    );

    if (!job) {
        return res.status(404).send({
            error: "Job not found"
        });
    }

    res.send({ data: job });
});

router.delete("/:id", isAdmin, async (req, res) => {
    const jobId = Number(req.params.id);

    const result = await db.run(
        `DELETE FROM jobs WHERE id = ?`,
        [jobId]
    );

    if (result.changes === 0) {
        return res.status(404).send({ error: "Job not found" });
    }

    const io = req.app.get("io");

    io.emit("job:delete", { id: jobId})

    res.send({ data: "Job deleted" });
});

export default router;