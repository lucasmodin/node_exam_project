import { moveAgv } from './util/agvService.js';
import { authorizeRoles } from '../middleware/accessControlSocket.js';
import { Roles } from '../data/roles.js';

export default function agvHandlers(io, socket) {

    const canMoveAgv = authorizeRoles(
        Roles.ADMIN,
        Roles.SUPERVISOR,
        Roles.OPERATOR
    );

    socket.on("agv:goToStation", async ({ agvId, station }) => {

        if (!canMoveAgv(socket, "move AGV")) {
            return;
        }

        await moveAgv(io, agvId, station);
    });
}
