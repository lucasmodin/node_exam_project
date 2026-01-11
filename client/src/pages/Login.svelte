<script>
    import { fetchPost } from "../util/fetchUtil.js";
    import { session } from '../stores/sessionStore.js';
    import { navigate } from 'svelte-routing';

    import socket from '../util/socket.js';

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
        socket.connect();
        loading = false;

        navigate("/dashboard");
    }

</script>

    <div class="login-wrapper">
        <div class="login-form-wrapper">
            <h1 class="header">MES-AGV Login</h1>
                <form class="form" on:submit|preventDefault={handleLogin}>
                    <div class="field">
                        <label for="username">Username</label>
                        <input id="username" bind:value={username} required disabled={loading}>
                    </div>
                    <div class="field">
                        <label for="password">Password</label>
                        <input id="password" type="password" bind:value={password} required disabled={loading}>
                    </div>
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

    <style>
        .login-wrapper {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 1rem;
        }

        .login-form-wrapper {
            width: min(420px, 100%);
            background: #161616;
            border: 1px solid #222;
            border-radius: 10px;
            padding: 1rem;
        }

        .form {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            margin-top: 0.5rem;
        }

        .field {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        }

        label {
            font-size: 0.75rem;
            opacity: 0.85;
        }

        .header {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            margin-bottom: 0.75rem;
        }

    </style>
