export function socketAuth(socket, next) {
    const user = socket.request.session?.user;

    if (!user) {
        return next(new Error("Unathorized"));
    }

    socket.user = user;

    next();
}