<script lang="ts">

    import { Router, Route } from "svelte-routing";
    import Login from "./lib/pages/Login.svelte";
    import Register from "./lib/pages/Register.svelte";
    import Dashboard from "./lib/pages/Dashboard.svelte";


</script>



<Router>
    <Route path="/login"><Login/></Route>
    <Route path="/registration"><Register/></Route>
    <Route path="/dashboard/*"><Dashboard/></Route>
</Router>