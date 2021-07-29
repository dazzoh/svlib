<script lang="ts">
    export let title = "";
    export let className = "";

</script>

<svg viewBox={`0 0 32 32`} class={`icon ${className}`}>
    <title>{title}</title>
    <slot />
</svg>

<style lang="postcss">
    .icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        stroke-width: 0;
        stroke: currentColor;
        fill: currentColor;
    }
</style>
