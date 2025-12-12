export function authorizeRoles(...allowRoles) {
    return (socket, actionName = "action") => {
        if (!allowedRoles.includes(socket.user.role)) {
            socket.emit("system:message", {
                type: "error",
                message: `Access denied. Insufficient clearance for ${actionName}`
            });
            return false;
        }
        return true;
    };
}