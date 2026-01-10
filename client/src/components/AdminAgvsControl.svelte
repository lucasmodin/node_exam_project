<script>
    import { createAgv, deleteAgv } from '../services/agvService.js';

    export let agvs = [];

    let agvName = "";
    let creating = false;
    let errorMsg = "";
    let deletingId = null;

    function clearError() {
        errorMsg = "";
    }

    async function handleCreate() {
        creating = true;
        clearError();

        const result = await createAgv(agvName);

        creating = false;

        if (result?.error) {
            errorMsg = result.error;
            return;
        }

        agvName = "";
    }

    async function handleDelete(agv) {
        if (!agv || deletingId !== null ) {
            return;
        }
        deletingId = agv.id;
        clearError();

        const result = await deleteAgv(agv.id);

        deletingId = null;

        if (result?.error) {
            errorMsg = result.error;
        }
    }
</script>

<div class="job-control">
    <h3>Create AGV</h3>

    <input
        placeholder="AGV name (e.g AGV-3"
        bind:value={agvName}
    />

    <button
        disabled={!agvName || creating}
        on:click={handleCreate}
    >
        {creating ? "Creating..." : "Create AGV"}
    </button>

    {#if errorMsg}
        <div class="error-message">{errorMsg}</div>
    {/if}

    <hr />

    {#each agvs as agv} 
        <div class="job-row">
            <span>{agv.name}</span>

            <span class="badge {agv.status}">
                {agv.status}
            </span>

            <button
                class="delete-btn"
                disabled={deletingId === agv.id}
                on:click={() => handleDelete(agv)}
            >
                {deletingId === agv.id ? "Deleting..." : "Delete"}
            </button>
        </div>
    {/each}
</div>