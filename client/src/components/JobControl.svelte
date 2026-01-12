<script>
    export let jobs = [];
    export let agvs = [];

    import ConfirmModal from './ConfirmModal.svelte';
    import { session } from '../stores/sessionStore.js';
    import socket from '../util/socket.js';
    import { deleteJob } from '../services/jobService.js';

    $: activeJobs = jobs.filter(
        job => job.stage !== "delivered" && job.stage !== "ready"
    );

    $: isAdmin = $session?.role === "admin";

    let jobName = "";
    let selectedAgv = "";

    //modal
    let confirmOpen = false;
    let jobToDelete = null;
    let deleting = false;
    let errorMsg = "";

    function clearError() {
        errorMsg = "";
    }

    function openDeleteModal(job) {
        if (!job || deleting) {
            return;
        }

        jobToDelete = job;
        confirmOpen = true;
        clearError();
    }

    function closeDeleteModal() {
        if (deleting) {
            return;
        }

        confirmOpen = false;
        jobToDelete = null;
    }

    async function confirmDelete() {
        if (!jobToDelete || deleting) {
            return;
        }

        deleting = true;
        clearError();

        const result = await deleteJob(jobToDelete.id);

        if (result?.error) {
            errorMsg = result.error;
            deleting = false;
            return;
        }

        deleting = false;
        closeDeleteModal();
    }
    
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
            <option value={agv.id}
            disabled={agv.status === "error"}>
                {agv.name} {(agv.status)}
            </option>
        {/each}
    </select>

    <button
        disabled={!jobName || !selectedAgv}
        on:click={() => {
            socket.emit("job:create", {
                name: jobName,
                agvId: Number(selectedAgv)
            });
            jobName = "";
            selectedAgv = "";
        }}
    >
        Create job
    </button>

    {#if errorMsg}
        <div class="error-message">{errorMsg}</div>
    {/if}

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
                    disabled={deleting}
                    on:click={() => openDeleteModal(job)}
                >
                    Delete
                </button>
            {/if}
        </div>
    {/each}
</div>

<ConfirmModal
    open={confirmOpen}
    title="Delete Job"
    message={`Are you sure you want to delete ${jobToDelete?.name}?`}
    confirmText="Yes, delete"
    cancelText="Cancel"
    loading={deleting}
    onConfirm={confirmDelete}
    onCancel={closeDeleteModal}
/>