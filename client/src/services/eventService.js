import { events } from "../stores/eventStore.js";
import { fetchGet } from "../util/fetchUtil.js";

export async function loadEvents() {
    const result = await fetchGet("/events");

    if (result.error) {
        return;
    }

    events.set(result.data);
}

export function addEvent(newEvent) { 
    events.update(current => {
        const index = current.findIndex(event => event.id === newEvent.id);

        if (index === -1) { //if event not found
            return [newEvent, ...current].slice(0, 100);
        }

        //if event exists
        return current.map(event =>
            event.id === newEvent.id ? newEvent : event
        );
    });
}