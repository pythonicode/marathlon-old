<script>
    import { navigating } from "$app/stores";
import "../global.css";
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

{#if $navigating}
    <div>
        
    </div>
{/if}

<slot />

<style>
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--primary-500);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>