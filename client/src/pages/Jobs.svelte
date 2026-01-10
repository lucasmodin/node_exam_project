<script>
    import { onMount } from "svelte";
    import { get } from 'svelte/store';

    import JobControl from "../components/JobControl.svelte";
    import JobList from "../components/JobList.svelte";
    import EventFeed from "../components/EventFeed.svelte";

    import { loadJobs } from "../services/jobService.js";
    import { loadAgvs } from "../services/agvService.js";
    import { loadEvents } from "../services/eventService.js";

    import { jobs } from '../stores/jobStore.js';
    import { events } from "../stores/eventStore.js";
    import { agvs } from '../stores/agvStore.js';

    import "../util/socket.js";

    onMount(() => {
        if (get(agvs).length === 0) loadAgvs();
        if (get(events).length === 0) loadEvents();
        if (get(jobs).length === 0) loadJobs();
    });
    
</script>

<div class="jobs-page">
    <section class="left">
        <JobControl agvs={$agvs} jobs={$jobs}/>
    </section>

    <section class="right">
        <JobList jobs={$jobs}/>
        <EventFeed events={$events}/>
    </section>
</div>

