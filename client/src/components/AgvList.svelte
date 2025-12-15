<script>
    import { agvs } from "../stores/agvStore.js";
</script>

<h3>AGVs</h3>

{#if $agvs.length === 0}
    <p>No AGVs avalaible</p>
{:else}
    <ul class="agv-list">
        {#each $agvs as agv}
            <li class="agv-item">
                <div class="name">{agv.name}</div>

                <div class="info">¨
                    <span class="status">{agv.status}</span>
                    <span class="position">({agv.x}), ({agv.y})</span>
                </div>
            </li>
        {/each}
    </ul>
{/if}