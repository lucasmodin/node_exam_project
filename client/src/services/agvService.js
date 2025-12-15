import { agvs } from "../stores/agvStore.js";
import { fetchGet } from "../util/fetchUtil.js";

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