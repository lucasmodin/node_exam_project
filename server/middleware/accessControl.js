import { Roles } from '../data/roles.js';

export function isOperator(req, res, next) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).send({
            error: "Unauthorized. You are not logged in"
        });
    }

    if (user.role === Roles.ADMIN || user.role === Roles.SUPERVISOR || user.role === Roles.OPERATOR) {
        req.user = user;
        return next();
    }

    return res.status(403).send({
        error: "Unauthorized. Operator access required"
    });
}

export function isSupervisor(req, res, next) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).send({
            error: "Unauthorized. You are not logged in"
        });
    }

    if (user.role === Roles.SUPERVISOR || Roles.ADMIN) {
        req.user = user;
        return next();
    }

    return res.status(403).send({
        error: "Unauthorized. You are not logged in"
    });
}

export function isAdmin(req, res, next) {
    const user = req.session.user;
    if (!user) {
        return res.status(401).send({
            error: "Unauthorized. You are not logged in"
        });
    }

    if (user.role === Roles.ADMIN) {
        req.user = user;
        return next();
    }

    return res.status(403).send({
        error: "Unauthorized. You are not logged in"
    });
}