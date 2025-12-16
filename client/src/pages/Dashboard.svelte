<script>
    import { onMount } from "svelte";

    import AgvMap from "../components/AgvMap.svelte";
    import AgvList from "../components/AgvList.svelte";
    import JobList from "../components/JobList.svelte";
    import EventFeed from "../components/EventFeed.svelte";


    import { loadAgvs } from "../services/agvService.js";
    import { loadJobs } from "../services/jobService.js";
    import { loadEvents } from "../services/eventService";

    import "../util/socket";


    onMount(() => {
        loadAgvs();
        loadJobs();
        loadEvents();
    })
</script>

<div class="dashboard">
    <div class="map-area">
        <AgvMap />
    </div>

    <aside class="side-panel">
        <section class="panel agv-panel">
            <h3>AGVs</h3>
            <AgvList />
        </section>

        <section class="panel job-panel">
            <h3>Jobs</h3>
            <JobList showAdvance={true} />
        </section>

        <section class="panel event-panel">
            <h3>Events</h3>
            <EventFeed />
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


.map-area {
    background: #111;
    border-right: 2px solid #222;
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

</style>