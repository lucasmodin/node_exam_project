<script>
    import { jobs } from '../stores/jobStore.js';
    import { agvs } from '../stores/agvStore.js';
    import socket from '../util/socket.js';

    $: activeJobs = $jobs.filter(job => job.stage !== "delivered")

    let jobName = "";
    let selectedAgv = "";
</script>

<div class="job-control">
    <h3>Create Job</h3>

    <input
        placeholder="Job name (e.g. Batch #203)"
        bind:value={jobName}
    >

    <select bind:value={selectedAgv}>
        <option value="">Select AGV</option>
        {#each $agvs as agv}
            <option value={agv.id}>
                {agv.name} {(agv.status)}
            </option>
        {/each}
    </select>

    <button
        disabled={!jobName || !selectedAgv}
        on:click={() => {
            socket.emit("job:create", {
                name: jobName,
                agvId: selectedAgv
            });
            console.log("EMITTING job:create", jobName, selectedAgv);

            jobName = "";
            selectedAgv = "";
        }}
    >
        Create job
    </button>

    <hr />

    <h3>Active Jobs</h3>

    {#each activeJobs as job}
        <div class="job-row">
            <span>{job.name}</span>
            <span class="badge">{job.stage}</span>

            <button
                on:click={() => {
                    console.log("EMITTING job:advance", job.id);
                    socket.emit("job:advance", { jobId: job.id })
                    }}
            >
                Advance
            </button>
        </div>
    {/each}
</div>

<style>
.job-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.job-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 0.5rem;
    padding: 6px;
    background: #121212;
    border: 1px solid #222;
}

</style>