<script>
    let layout = "horizontal";

</script>
<div class="flex flex-1 h-screen w-screen flex bg-body dark:bg-gray-800">
    <header class='w-[15rem] block shadow rounded bg-white'
            class:horizontal={layout==="horizontal"}>
        <slot name="menu"/>
    </header>
    <main class="flex-1 overflow-auto min-h-0 min-w-0">
        <slot name="view"/>
    </main>
</div>

<style lang="postcss">
    .horizontal {
        @apply overflow-y-auto h-full
    }
</style>
