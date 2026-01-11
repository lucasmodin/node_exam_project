<script>
  import { Router, Link, Route } from 'svelte-routing';
  import ProtectedRoutes from './components/ProtectedRoutes.svelte';
  import { session } from './stores/sessionStore';
  import { logout } from './services/logoutService';

  import Login from './pages/Login.svelte';
  import Dashboard from './pages/Dashboard.svelte';
  import Jobs from './pages/Jobs.svelte';
  import AdminAgvs from './pages/AdminAgvs.svelte';
</script>

<div class="page-wrapper">
  <Router>
    <nav class="nav-bar">
      <Link to="/">Home</Link>

      {#if $session}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/jobs">Jobs</Link>

        {#if $session.role === "admin"}
          <Link to="/admin/agvs">AGV Admin</Link>
        {/if}

        <div class="nav-right">
          <div class="session-info">
            Logged in as <strong>{$session.username}</strong>
            <span class="role">({$session.role})</span>
          </div>

          <button on:click={logout}>Logout</button>
        </div>
        
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

    <Route path="/jobs">
      <ProtectedRoutes component={Jobs} roles={["operator", "supervisor", "admin"]}/>
    </Route>

    <Route path="/dashboard">
      <ProtectedRoutes component={Dashboard} roles={["operator", "supervisor", "admin"]} />
    </Route>

    <Route path="/admin/agvs">
      <ProtectedRoutes component={AdminAgvs} roles={["admin"]} />
    </Route>

  </Router>

</div>

<style>
  
</style>
