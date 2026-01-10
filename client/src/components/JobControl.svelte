<script>
    export let jobs = [];
    export let agvs = [];
    import { session } from '../stores/sessionStore.js';
    import socket from '../util/socket.js';
    import { deleteJob } from '../services/jobService.js';

    $: activeJobs = jobs.filter(
        job => job.stage !== "delivered" && job.stage !== "ready"
    );

    let jobName = "";
    let selectedAgv = "";

    $: isAdmin = $session?.role === "admin";
</script>

<div class="job-control">
    <h3>Create Job</h3>

    <input
        placeholder="Job name (e.g. Batch #203)"
        bind:value={jobName}
    >

    <select bind:value={selectedAgv}>
        <option value="">Select AGV</option>
        {#each agvs as agv}
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
                    socket.emit("job:advance", { jobId: job.id })
                    }}
            >
                Advance
            </button>

            {#if isAdmin}
                <button
                    class="delete-btn"
                    on:click={() => deleteJob(job.id)}
                >
                    Delete
                </button>
            {/if}
        </div>
    {/each}
</div>
