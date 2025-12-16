<script>
    import AdminAgvsControl from "../components/AdminAgvsControl.svelte";
    import '../util/socket.js';
</script>

<div class="jobs-page">
    <section class="left">
        <AdminAgvsControl />
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