<script>
    import { jobs } from "../stores/jobStore.js";
</script>

<h3>Jobs</h3>

{#if $jobs.length === 0}
    <p>No jobs available</p>
{:else}
    <ul class="job-list">
        {#each $jobs as job }
            <li class="job-item">
                <div class="job-name">{job.name}</div>
                <div class="job-stage">{job.stage}</div>
                {#if job.assigned_agv}
                    <div class="job-assigned">AGV #{job.assigned_agv}</div>
                {/if}
            </li>
        {/each}
    </ul>
{/if}