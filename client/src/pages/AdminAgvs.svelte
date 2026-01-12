<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { agvs } from '../stores/agvStore.js';
    import { loadAgvs } from '../services/agvService';
    import AdminAgvsControl from "../components/AdminAgvsControl.svelte";

    onMount(() => {
        if (get(agvs).length === 0) {
            loadAgvs();
        }
    });

</script>

<div class="jobs-page">
    <section class="left">
        <AdminAgvsControl agvs={$agvs}/>
    </section>

    <section class="right">
        <div class="panel">
            <h3>Info</h3>
            <div>
                <p>AGV administration and status overview.</p>
            </div>
        </div>
        
    </section>
</div>