<script>
  import { Router, Link, Route } from 'svelte-routing';
  import ProtectedRoutes from './components/ProtectedRoutes.svelte';
  import { session } from './stores/sessionStore';
  import { logout } from './services/logoutService';

  import Login from './pages/Login.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  


</script>

<div class="page-wrapper">
  <Router>
    <nav class="nav-bar">
      <Link to="/">Home</Link>

      {#if $session}
        <Link to="/dashboard">Dashboard</Link>
        <button on:click={logout}>Logout</button>
      {:else}
        <Link to="/login">Login</Link>
      {/if}
    </nav>

    <Route path="/">
      <h1>MES-AGV Sytem</h1>
    </Route>

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/dashboard">
      <ProtectedRoutes component={Dashboard} />
    </Route>
  </Router>

</div>

<style>
  
</style>
