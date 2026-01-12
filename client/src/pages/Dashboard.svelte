<script>
    import { onMount } from "svelte";

    import AgvMap from "../components/AgvMap.svelte";
    import AgvList from "../components/AgvList.svelte";
    import JobList from "../components/JobList.svelte";
    import EventFeed from "../components/EventFeed.svelte";


    import { loadAgvs } from "../services/agvService.js";
    import { loadJobs } from "../services/jobService.js";
    import { loadEvents } from "../services/eventService";

    onMount(() => {
        loadAgvs();
        loadJobs();
        loadEvents();
    })

    import { agvs } from '../stores/agvStore.js';
    import { events } from "../stores/eventStore.js";
    import { jobs } from '../stores/jobStore.js'

</script>

<div class="dashboard">
    <div class="map-area">
        <div class="map-wrapper">
            <AgvMap agvs={$agvs}/>
        </div>
        <div class="attention-panel">
            <h3>AGV's that require attention</h3>

            {#if $agvs.filter(agv => agv.status === "error").length === 0}
                <div class="empty">No AGV's in error. All is good</div>
            {:else}
                {#each $agvs.filter(agv => agv.status === "error") as agv}
                    <div class="attention-row">
                        <span class="name">{agv.name}</span>
                        <span class="meta">id: {agv.id}</span>
                        <span class="badge error">ERROR</span>
                    </div>
                {/each}
            {/if}
        </div>
    </div>

    <aside class="side-panel">
        <section class="panel agv-panel">
            <h3>AGVs</h3>
            <AgvList agvs={$agvs} showEditAgvStatus={true}/>
        </section>

        <section class="panel job-panel">
            <h3>Jobs</h3>
            <JobList showAdvance={true} jobs={$jobs} />
        </section>

        <section class="panel event-panel">
            <h3>Events</h3>
            <EventFeed events={$events}/>
        </section>
    </aside>
</div>

<style>
 .dashboard {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(320px, 1.3fr);
    height: calc(100vh - 60px);
    background: #0b0b0b;
}

.attention-panel {
  flex: 0 0 auto;
  border-top: 1px solid #222;
  background: #0f0f0f;
  padding: 0.75rem;
  max-height: 180px;     
  overflow-y: auto;
}

.attention-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border: 1px solid #222;
  background: #121212;
  border-radius: 6px;
  margin-top: 6px;
}

.map-area {
    background: #111;
    border-right: 2px solid #222;
    overflow: hidden;
    flex-direction: column;
    min-height: 0;
}

.map-wrapper {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;  
}


.side-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: #0f0f0f;
}


.panel {
    background: #161616;
    border: 1px solid #222;
    border-radius: 6px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.panel h3 {
    margin: 0 0 0.5rem 0;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #aaa;
}


.agv-panel {
    flex: 0 0 auto;
}

.job-panel {
    flex: 1 1 auto;
    overflow-y: auto;
}

.event-panel {
    flex: 1 1 auto;
    overflow-y: auto;
    border-top: 1px solid #222;
}

.empty {
  opacity: 0.7;
  font-size: 0.85rem;
}
</style>