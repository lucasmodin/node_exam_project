import { events } from "../stores/eventStore.js";
import { fetchGet } from "../util/fetchUtil.js";

export async function loadEvents() {
    const result = await fetchGet("/events");

    if (result.error) {
        return;
    }

    events.set(result.data);
}

export function addEvent(event) {
    events.update(current => {
        return [event, ...current].slice(0,100);
    })
}