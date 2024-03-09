<script lang="ts">
    import { Progress } from "@sveltestrap/sveltestrap";
    import { UserService } from "../services/UserService";


    const {getUserInfo} = UserService()

    let promise = getUserInfo()

</script>

{#await promise}
    <Progress value={50}></Progress>
{:then responce}
    {responce.userName}
{:catch}
    <p>error</p>
    
{/await}