<script>
    import { onMount } from "svelte";

    import JobControl from "../components/JobControl.svelte";
    import JobList from "../components/JobList.svelte";
    import EventFeed from "../components/EventFeed.svelte";

    import { loadJobs } from "../services/jobService.js";
    import { loadAgvs } from "../services/agvService.js";
    import { loadEvents } from "../services/eventService.js";

    import "../util/socket.js";

    onMount(() => {
        loadJobs();
        loadAgvs();
        loadEvents();
    });
    
</script>

<div class="jobs-page">
    <section class="left">
        <JobControl />
    </section>

    <section class="right">
        <JobList />
        <EventFeed />
    </section>
</div>

