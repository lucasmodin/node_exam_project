export function socketAuth(socket, next) {
    const user = socket.request.session?.user;

    if (!user) {
        socket.user = null;
        return next();
    }

    socket.user = user;

    next();
}