<script>
    let layout = "horizontal";

</script>
<div class="flex flex-1 h-screen w-screen">
    <header class='w-[15rem] block bg-white'
            class:horizontal={layout==="horizontal"}>
        <slot name="menu"/>
    </header>
    <main class="flex-1 overflow-auto min-h-0 min-w-0 bg-gray-500 text-white flex">
        <slot name="view"/>
    </main>
</div>

<style lang="postcss">
    header {
        box-shadow: 1px 0px 12px 0 rgb(0 0 0 / 39%);
        z-index: 3;
    }

    .horizontal {
        @apply overflow-y-auto h-full
    }
</style>
