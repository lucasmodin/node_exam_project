import { agvs } from "../stores/agvStore.js";
import { fetchGet, fetchPost, fetchDelete } from "../util/fetchUtil.js";

export async function loadAgvs() {
    const result = await fetchGet("/agvs");

    if (result.error) {
        return;
    }

    agvs.set(result.data);
}

export function updateAgv(updatedAgv) { //update ui store
    agvs.update(current => {
        const index = current.findIndex(agv => agv.id === updatedAgv.id);

        if (index === -1) {
            return [...current, updatedAgv];
        }

        current[index] = updatedAgv;
        return [...current];
    });
}

export function removeAgv({ id }) {
    const incomingId = Number(id); //update ui store
    agvs.update(current => 
        current.filter(agv => agv.id !== incomingId)
    );
}

export async function createAgv(name) {
    const result = await fetchPost("/agvs", {name});

    return result;
}

export async function deleteAgv(agvId) {
    const result = await fetchDelete(`/agvs/${agvId}`);

    return result;
}