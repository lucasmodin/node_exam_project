<script>
    export let events = [];
</script>

<div class="event-log">
    {#if events.length === 0}
        <div class="event-line muted">No events yet</div>
    {:else}
        {#each events as event}
            <div class="event-line">
                <span class="message">{event.message}</span>

                <span class="meta">
                    {#if event.agv_id}
                        AGV {event.agv_id}
                    {/if}
                    {#if event.job_id}
                        JOB {event.job_id}
                    {/if}
                </span>
            </div>
        {/each}
    {/if}
</div>

<style>
.event-log {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: monospace;
    font-size: 0.9rem;
}

/* LOG LINE */
.event-line {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 6px 8px;
    background: #101010;
    border-left: 3px solid #333;
}

/* MESSAGE */
.message {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* META INFO */
.meta {
    opacity: 0.6;
    font-size: 0.75rem;
    display: flex;
    gap: 0.5rem;
}

.muted {
    opacity: 0.4;
}
</style>
