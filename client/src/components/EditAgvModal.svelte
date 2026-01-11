<script>
    export let open = false;
    export let loading = false;
    export let errorMsg = "";

    export let initialName = "";
    export let initialStatus = "idle";

    export let onSave = (name, status) => {};
    export let onCancel = () => {};
     
    let name = "";
    let status = "";

    $: if (open) {
        name = initialName;
        status = initialStatus;
    }

    const statuses = ["idle", "moving", "delivering", "error"];
</script>

{#if open}
    <div class="modal-backdrop" on:click={onCancel}></div>

    <div class="modal">
        <h3>Edit</h3>

        {#if errorMsg}
            <div class="error">{errorMsg}</div>
        {/if}

        <input
            bind:value={name}
            disabled={loading}
            placeholder="AGV name"
        >

        <select
            bind:value={status}
            disabled={loading}
        >
        {#each statuses as selectStatus}
            <option value={selectStatus}>{selectStatus}</option>
        {/each}
        </select>

        <div class="actions">
            <button on:click={onCancel} disabled={loading}>
                Cancel
            </button>

            <button on:click={() => onSave(name, status)} disabled={loading}>
                {loading ? "Saving" : "Save"}
            </button>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.6);
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #161616;
        border: 1px solid #222;
        padding: 1rem;
        width: 300px;
        border-radius: 6px;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: .5rem;
        margin-top: .75rem;
    }
</style>