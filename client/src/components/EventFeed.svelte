<script>
    import { events } from "../stores/eventStore.js";
</script>

<h3>Events</h3>

{#if $events.length === 0}
    <p>No events yet</p>
{:else}
    <ul>
        {#each $events as event}
            <li class="event-item">
                <div class="message">{event.message}</div>
                <div class="meta">
                    {#if event.agv_id}
                        <span>AGV #{event.agv_id}</span>
                    {/if}
                    {#if event.job_id}
                        <span>Job #{event.job_id}</span>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
{/if}