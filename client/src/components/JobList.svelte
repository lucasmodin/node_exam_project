<script>
  import { jobs } from "../stores/jobStore.js";
  import { session } from "../stores/sessionStore.js";
  import socket from '../util/socket.js'

  export let showAdvance = false;
  function canAdvance(role) {
    return role === "admin" || role === "supervisor";
  }

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

      {#if showAdvance && canAdvance($session?.role) && job.stage !== "delivered"}
        <button
            class="advance-btn"
            on:click={() => socket.emit("job:advance", { jobId: job.id })}
        >
            Advance
        </button>
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
  grid-template-columns: 1fr auto auto auto;
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

.advance-btn {
  font-size: 0.7rem;
  padding: 3px 8px;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 3px;
  text-transform: uppercase;
  background: #1f7a4a; 
}

.advance-btn:hover {
  background: #252525;
}

</style>
