<script lang="ts">
    import { Route, Router} from "svelte-routing";
    import Profile from "../components/Profile.svelte";
    import Navigation from "../components/Navigation.svelte";
</script>

<Navigation/>

<Router basepath="/dashboard">
    <Route path="/profile"><Profile/></Route>
</Router>