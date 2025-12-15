import { agvs } from "../stores/agvStore.js";
import { fetchGet, fetchPost, fetchDelete } from "../util/fetchUtil.js";

export async function loadAgvs() {
    const result = await fetchGet("/agvs");

    if (result.error) {
        return;
    }

    agvs.set(result.data);
}

export function updateAgv(updatedAgv) {
    agvs.update(current => {
        const index = current.findIndex(agv => agv.id === updatedAgv.id);

        if (index === -1) {
            return [...current, updatedAgv];
        }

        current[index] = updatedAgv;
        return [...current];
    });
}

export async function createAgv(name) {
    const result = await fetchPost("/agvs", {name});

    if (!result?.error && result.data) {
        agvs.update(current => [...current, result.data])
    }

    return result;
}

export async function deleteAgv(agvId) {
    const result = await fetchDelete(`/agvs/${agvId}`);

    if (!result?.error) {
        agvs.update(current => current.filter(agv => agv.id !== agvId));
    }

    return result;
}