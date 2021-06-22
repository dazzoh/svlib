<script>
    import { setContext } from "svelte";

    import MenuView from "../layout/MenuView.svelte";
    import { AppService } from "./app-service";

    setContext(AppService, new AppService());
</script>

<div class="h-screen w-screen flex bg-body relative">
    {#if $$slots.nav}
        <MenuView>
            <slot name="nav" slot="menu" />
            <slot name="content" slot="view" />
        </MenuView>
    {/if}
    <slot />
</div>
