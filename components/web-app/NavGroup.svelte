<div class="flex flex-col items-center p-2">
    <h2 class="text-2xl" use:active={route}>{name}</h2>
    <slot />
</div>
<script lang="ts">
    import active from 'svelte-spa-router/active'
    export let route:string;
    export let name:string;
</script>

<style>
    /* Style for "active" links; need to mark this :global because the router adds the class directly */
   h2:global(.active) {
        color: var(--color-primary);
    }
</style>

