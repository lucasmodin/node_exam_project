<script>
  import { Router, Link, Route } from 'svelte-routing';
  import ProtectedRoutes from './components/ProtectedRoutes.svelte';
  import { session } from './stores/sessionStore';
  import Login from './pages/Login.svelte';
  import { logout } from './services/logoutService';
</script>

<div class="page-wrapper">
  <Router>
    <nav class="nav-bar">
      <Link to="/">Home</Link>

      {#if $session}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Map</Link>
        <button on:click={logout}>Logout</button>
      {:else}
        <Link to="/login">Login</Link>
      {/if}
    </nav>

    <Route path="/login">
      <Login />
    </Route>

  </Router>

</div>

<style>
  
</style>
