<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { fetchGet } from "../util/fetchUtil.js";
    import { session } from "../stores/sessionStore.js";
    import { Roles } from "../util/roles.js";

    export let component; 
    export let roles = [];

    let loading = true;
    let allowed = false;
    let authError = "";

    onMount(async () => {
        const result = await fetchGet("/auth/me");

        if(result?.data) {
            session.set(result.data);

            if (Roles.length === 0 || roles.includes(result.data.role)) {
                allowed = true;
            } else {
                authError = "You do not have access to this page";
            }
            
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
