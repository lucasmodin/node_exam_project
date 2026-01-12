import { agvs } from "../stores/agvStore.js";
import { fetchGet, fetchPost, fetchDelete, fetchPatch } from "../util/fetchUtil.js";
import { updateJob } from "./jobService.js";

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

        if (index === -1) { //if agv does not exist
            return [updatedAgv, ...current];
        }

        //if agv exists
        return current.map(agv => 
            agv.id === updatedAgv.id ? updatedAgv : agv
        );
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

export async function setAgvStatusAndName(agvId, {name, status}) {
    const result = await fetchPatch(`/agvs/${agvId}`, { name, status })

    return result;
}