import { Router } from 'express';
import db from '../database/connection.js';
import bcrypt from 'bcryptjs';
import { isOperator } from '../middleware/accessControl.js';

const router = Router();

router.post("/login", async(req, res) => {
    const { username, password } = req.body;

    const user = await db.get(
        "SELECT * FROM users WHERE username = ?", [username]
    );

    if (!user) {
        return res.status(401).send({
            error: "Invalid username or password"
        });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
        return res.status(401).send({
            error: "Invalid username or password"
        });
    }

    req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    res.send({
        data: "Login successful",
        user: req.session.user
    });
});

router.post("/logout", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send({
            error: "No active session"
        });
    }

    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.send({
            data: "You have been logged out"
        });
    });
});

router.get("/me", isOperator, (req, res) => {
    res.send({
        data: {
            id: req.user.id,
            username: req.user.username,
            role: req.session.role
        }
    });
});


export default router;