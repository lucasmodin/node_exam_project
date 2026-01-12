<script>
    import { createAgv, deleteAgv, setAgvStatusAndName } from '../services/agvService.js';
    import ConfirmModal from './ConfirmModal.svelte';
    import EditAgvModal from './EditAgvModal.svelte';

    export let agvs = [];

    let agvName = "";
    let creating = false;   
    let errorMsg = "";

    let deleting = false;

    //modal (delete)
    let confirmOpen = false;
    let agvToDelete = null;

    //modal (edit)
    let editOpen = false;
    let agvToEdit = null;
    let editing = false;


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

    function openDeleteModal(agv) {
        if (!agv || deleting) {
            return;
        }

        agvToDelete = agv;
        confirmOpen = true;
        clearError();
    }

    function closeDeleteModal() {
        confirmOpen = false;
        agvToDelete = null;
    }

    async function confirmDelete() {
        if (!agvToDelete || deleting) {
            return;
        }
        deleting = true;
        clearError();

        const result = await deleteAgv(agvToDelete.id);

        deleting = false;

        if (result?.error) {
            errorMsg = result.error;
            return;
        }

        closeDeleteModal();
    }

    function openEditModal(agv) {
       agvToEdit = agv;
       editOpen = true;
       clearError(); 
    }

    function closeEditModal() {
        if (editing) {
            return;
        }

        editOpen = false;
        agvToEdit = null;
        clearError();
    }

    async function confirmEdit(name, status) {
        if (!agvToEdit) {
            return;
        }

        editing = true;
        clearError();

        const result = await setAgvStatusAndName(agvToEdit.id, { name, status });

        editing = false;

        if (result?.error) {
            errorMsg = result.error;
            return;
        }

        closeEditModal();
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

            <div class="actions">
                <button
                    class="edit-btn"
                    on:click={() => openEditModal(agv)}
                    disabled={editing || deleting}
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    disabled={deleting}
                    on:click={() => openDeleteModal(agv)}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    {/each}
</div>

<ConfirmModal
    open={confirmOpen}
    title="Delete AGV"
    message={`Are you sure you want to delete ${agvToDelete?.name}?`}
    confirmText="Yes, delete"
    loading={deleting}
    onConfirm={confirmDelete}
    onCancel={closeDeleteModal}
/>

<EditAgvModal
    open={editOpen}
    loading={editing}
    errorMsg={errorMsg}
    initialName={agvToEdit?.name ?? ""}
    initialStatus={agvToEdit?.status ?? "idle"}
    onSave={confirmEdit}
    onCancel={closeEditModal}
/>

<style>
    .actions {
        display: flex;
        gap: 0.5rem;
    }
</style>

