<a class="my-2" href="{route}" use:link use:active><slot /></a>

<script lang="ts">
    import {link} from 'svelte-spa-router'
    import active from 'svelte-spa-router/active'

    export let route:string;

</script>

<style>

    a {
        @apply text-center py-1;
        width:100%;
    }

    /* Style for "active" links; need to mark this :global because the router adds the class directly */
    :global(a.active) {
        @apply text-white bg-blue-500 rounded;
    }
</style>

