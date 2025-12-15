<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { fetchGet } from "../util/fetchUtil.js";
    import { session } from "../stores/sessionStore.js";

    export let component; 

    let loading = true;
    let allowed = false;
    let authError = "";

    onMount(async () => {
        const result = await fetchGet("/auth/me");

        if(result?.data) {
            session.set(result.data);
            allowed = true;
        } else {
            authError = result?.error || "Unauthorized access!";

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }

        loading = false;
    });
</script>

{#if loading}
    <div class="loading">Authenticating...</div>
{:else}
    {#if allowed}
        <svelte:component this={component} />
    {:else}
        <div class="error-message">
            {authError}
        </div>
    {/if}
{/if}
