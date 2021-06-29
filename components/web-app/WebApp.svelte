<script>
    import MenuView from "../layout/MenuView.svelte";
</script>
<div class='h-screen w-screen flex bg-body  relative'>
    <MenuView>
        <slot name="nav" slot="menu" />
        <slot name="content" slot="view" />
    </MenuView>
</div>


