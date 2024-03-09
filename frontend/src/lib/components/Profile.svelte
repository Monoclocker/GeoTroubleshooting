<script lang="ts">
    import { Progress } from "@sveltestrap/sveltestrap";
import { UserService } from "../services/UserService";


    const {getUserInfo} = UserService()

    let promise = getUserInfo()

</script>

{#await promise}
    <Progress value={20}></Progress>
{:then responce}
    {responce}
{:catch}
    <p>error</p>
    
{/await}