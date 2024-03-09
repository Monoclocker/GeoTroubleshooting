<script lang="ts">
    import { Route, Router} from "svelte-routing";
    import Profile from "../components/Profile.svelte";
    import Navigation from "../components/Navigation.svelte";
    import MapContainer from "../components/MapContainer.svelte";
</script>

<Navigation/>

<Router basepath="/dashboard">
    <Route path="/profile"><Profile/></Route>
    <Route path="/map"><MapContainer/></Route>
</Router>