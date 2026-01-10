<script>
  export let agvs = [];
</script>

<div class="agv-table">
  {#each agvs as agv}
    <div class="agv-row">
      <span class="name">{agv.name}</span>
      <span class="status {agv.status}">{agv.status}</span>
    </div>
  {/each}
</div>

<style>
.agv-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agv-row {
  display: grid;
  grid-template-columns: 1fr auto;
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
