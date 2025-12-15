<script>
    import { fetchPost } from "../util/fetchUtil.js";
    import { session } from '../stores/sessionStore.js';
    import { navigate } from 'svelte-routing';

    let username = "";
    let password = "";
    let error = "";
    let loading = false;

    async function handleLogin() {
        loading = true;
        error = "";

        const result = await fetchPost("/auth/login", {
            username: username,
            password: password
        });

        if (result.error) {
            loading = false;
            error = result.error;
            return;
        }

        session.set(result.user);
        loading = false;

        navigate("/dashboard");
    }

</script>

    <div class="login-wrapper">
        <h1>MES-AGV Login</h1>
        
        <div class="login-form-wrapper">
            <form on:submit|preventDefault={handleLogin}>
                <label>Username</label>
                <input bind:value={username} required disabled={loading}>

                <label>Password</label>
                <input type="password" bind:value={password} required disabled={loading}>

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>

        {#if loading}
            <div class="loading">Loading...</div>
        {/if}

        {#if error}
            <div class="error-message">{error}</div>
        {/if}

    </div>