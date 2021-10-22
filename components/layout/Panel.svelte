<script>
    import IconEnlarge from "@svlib/components/icon/IconEnlarge.svelte";
    import Icon from "@svlib/components/icon/Icon.svelte";
    import IconCollapse from "@svlib/components/icon/IconCollapse.svelte";

    export let className = ""

    /**
     * Allow expansion to fullscreen - achieved via pos fixed 0 0 0 0
     * @type {boolean}
     */
    export let allowFullscreen = false;

    let fullscreen = false;

    function toggleFullScreen() {
        console.log(fullscreen)
        fullscreen = !fullscreen;
    }

</script>

<div class={`panel ${className}`} class:fullscreen>
    <h2 class="header px-2 bg-gradient-to-r from-dark-400 to-dark-500  ">
        <span class="flex-1">
            <slot name="header"/>
        </span>
        {#if allowFullscreen}
            <Icon on:click={toggleFullScreen}  className="text-gray-400 cursor-pointer" title={fullscreen ? "Collapse" : "Expand"}>
                {#if fullscreen}
                    <IconCollapse/>
                {:else }
                    <IconEnlarge/>
                {/if}
            </Icon>
        {/if}
    </h2>
    <div class="body">
        <slot/>
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

    .fullscreen {
        @apply fixed inset-1 z-30;
    }
</style>
