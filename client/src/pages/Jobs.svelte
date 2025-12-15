<script>
    import { onMount } from "svelte";

    import JobControl from "../components/JobControl.svelte";
    import JobList from "../components/JobList.svelte";
    import EventFeed from "../components/EventFeed.svelte";

    import { loadJobs } from "../services/jobService.js";
    import { loadAgvs } from "../services/agvService.js";

    import "../util/socket.js";

    onMount(() => {
        loadJobs();
        loadAgvs();
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

<style>
.jobs-page {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    height: calc(100vh - 60px);
    gap: 1rem;
    padding: 1rem;
}

.left {
    background: #0f0f0f;
    padding: 1rem;
    border: 1px solid #222;
}

.right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
