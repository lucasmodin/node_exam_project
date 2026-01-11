<script>
  import { session } from "../stores/sessionStore";
  import { setAgvStatusAndName } from "../services/agvService";
  import EditAgvModal from "./EditAgvModal.svelte";

  export let showEditAgvStatus = false;
  export let agvs = [];
  
  let open = false;
  let agvToEdit = null;
  let errorMsg = "";
  let loading = false;


  function canEdit(role) {
    return role === "admin" || role === "supervisor"
  }

  function clearError() {
    errorMsg = "";
  }

  
  function openEditor(agv) {
    agvToEdit = agv;
    open = true;
    clearError();
  }

  function closeEditor() {
    if (loading) {
      return;
    }
    open = false;
    agvToEdit = null;
    clearError();
  }

  async function changeStatusAndName(name, status) {
    if (!agvToEdit) {
      return;
    }

    loading = true;
    clearError();

    const result = await setAgvStatusAndName(agvToEdit.id, { name, status });

    loading = false;

    if (result?.error) {
      errorMsg = result.error;
      return;
    }

    closeEditor();
  }
</script>

<div class="agv-table">
  {#each agvs as agv}
    <div class="agv-row">
      <span class="name">{agv.name}</span>
      <span class="status {agv.status}">{agv.status}</span>
      {#if showEditAgvStatus && canEdit($session?.role)}
        <button on:click={() => openEditor(agv)} disabled={loading}>
          Edit
        </button>
      {/if}
    </div>
  {/each}
</div>

<EditAgvModal 
  open={open}
  loading={loading}
  errorMsg={errorMsg}
  initialName={agvToEdit?.name ?? ""}
  initialStatus={agvToEdit?.status ?? "idle"}
  onSave={changeStatusAndName}
  onCancel={closeEditor}
/>

<style>
.agv-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agv-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  padding: 8px 10px;
  align-items: center;
  padding: 6px 8px;
  background: #121212;
  border: 1px solid #222;
  font-size: 0.9rem;
}

.status {
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 3px;
}

.status.idle { background: #1f7a4a; }
.status.moving { background: #8a6d1d; }
.status.delivering { background: #1f4c7a; }
.status.error { background: #7a1f1f; }
</style>
