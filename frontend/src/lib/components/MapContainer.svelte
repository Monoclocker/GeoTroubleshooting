<svelte:head>
    <title>map</title>
    <script src="https://api-maps.yandex.ru/v3/?apikey={import.meta.env.VITE_MAP_API_KEY}&lang=ru_RU"></script>
</svelte:head>

<script lang="ts">
    import { onMount } from 'svelte';
    import init from '../utils/Map'

    let container: HTMLElement
    
    let promise: Promise<void>


    onMount(async ()=>{
       promise = init(container)
    })
</script>

{#await promise}
    <p>loading</p>
{:then m} 
    <div bind:this={container}>
        
    </div>
{/await}




