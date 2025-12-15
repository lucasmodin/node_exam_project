
export function authorizeRoles(...allowedRoles) {
    return function (socket, action = "perform this action") {

        if (!socket.user) {
            socket.emit("system:message", {
                type: "error",
                message: "Unauthorized"
            });
            return false;
        }

        if (!allowedRoles.includes(socket.user.role)) {
            socket.emit("system:message", {
                type: "error",
                message: `Permission denied to ${action}`
            });
            return false;
        }

        return true;
    };
}
