<script>
    import { agvs } from "../stores/agvStore.js";

    const MAP_WIDTH = 1000;
    const MAP_HEIGHT = 600;
</script>

<div class="map-wrapper">
    <div class="map-container">
        <img src="/assets/map.png" alt="AGV Map" class="map-image">
            {#each $agvs as agv}
                <div
                    class="agv-dot {agv.status}"
                    title={agv.name}
                    style="
                        left: {(agv.x / MAP_WIDTH) * 100}%;
                        top: {(agv.y / MAP_HEIGHT) * 100}%;
                    ">
                    {agv.id}
                </div>
            {/each}
    </div>  
</div>

<style>
.map-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
}


.map-container {
    position: relative;
    width: 100%;
    max-width: 100%;
}


.map-image {
    width: 100%;
    height: auto;        
    display: block;
}

.agv-dot {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.65rem;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: left 1s linear, top 1s linear;
}

.agv-dot.idle { background: #4caf50; }
.agv-dot.moving { background: #ffb300; }
.agv-dot.delivering { background: #2196f3; }
.agv-dot.error { background: #f44336; }

</style>