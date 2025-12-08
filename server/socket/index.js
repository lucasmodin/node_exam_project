
export default function socketHandler(io) {

    io.on("connection", (socket) => {
        

        socket.on("disconnect", () => {
            
        })
    })
}