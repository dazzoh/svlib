<div class:inline class={className}>
    <label class:px-2={inline}>{label}</label>
    <slot/>
</div>

<script lang="ts">
    export let label: string;
    export let className = ""
    export let inline = false;


</script>

<style lang="postcss">
    .inline {
        @apply inline-flex justify-center items-center;
    }
</style>
