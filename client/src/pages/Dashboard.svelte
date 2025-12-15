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

    <div class="side-panel"></div>

</div>