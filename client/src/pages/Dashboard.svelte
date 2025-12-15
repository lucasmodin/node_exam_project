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

    <div class="side-panel">
        <section class="panel">
            <AgvList />
        </section>

        <section class="panel">
            <JobList />
        </section>

        <section class="panel">
            <EventFeed />
        </section>
    </div>
</div>

<style>
    .dashboard {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: calc(100vh - 60px);
}

.map-area {
    background: #111;
    border-right: 1px solid #333;
}

.side-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;
    background: #0f0f0f;
}

.panel {
    background: #1a1a1a;
    padding: 0.75rem;
    border-radius: 4px;
}
</style>