import { Router } from "express";
import { isOperator } from "../../middleware/accessControl";
import db from '../../database/connection.js';

const router = Router();

router.get("/", isOperator, async (req, res) => {
    const events = await db.all(
        `SELECT * FROM events ORDER BY created_at DESC LIMIT 100`
    );

    res.send({ data: events });
});

export default router;