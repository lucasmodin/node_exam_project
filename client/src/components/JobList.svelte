<script>
  import { jobs } from "../stores/jobStore.js";
</script>

<div class="job-table">
  {#each $jobs as job}
    <div class="job-row">
      <span class="job-name">{job.name}</span>

      <span class="job-stage">{job.stage}</span>

      {#if job.assigned_agv}
        <span class="job-agv">AGV {job.assigned_agv}</span>
      {:else}
        <span class="job-agv muted">-</span>
      {/if}
    </div>
  {/each}
</div>

<style>
.job-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}


.job-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: 8px 10px;
  background: #121212;
  border: 1px solid #222;
  font-size: 0.9rem;
}


.job-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.job-stage {
  font-size: 0.75rem;
  text-transform: uppercase;
  background: #2a2a2a;
  padding: 3px 8px;
  border-radius: 3px;
}


.job-agv {
  font-size: 0.75rem;
  padding: 3px 8px;
  background: #1e1e1e;
  border-radius: 3px;
}

.job-agv.muted {
  opacity: 0.4;
}
</style>
