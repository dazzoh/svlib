<script>
    export let className=""
</script>

<div class={`panel ${className}`}>
    <h2  class="header px-2 bg-gradient-to-r from-dark-400 to-dark-500  ">
        <span class="flex-1">
            <slot name="header" />
        </span>        
        <!-- <Icon title="Fullscreen">
            <IconEnlarge />
        </Icon> -->
    </h2>
    <div class="body">
        <slot />
    </div>
</div>

<style lang="postcss">
    .panel {
        @apply bg-dark-300 rounded flex flex-col  min-h-0;
    }

    .header {
        @apply text-light-200 flex items-center;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        box-shadow: 0px 2px 2px #00000073;
    }

    .body {
        @apply flex-1 mt-1 flex;
        overflow: auto;
    }
</style>
