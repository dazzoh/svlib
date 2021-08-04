<script lang="ts">
    import { portal } from "@svlib/actions/portal";

    export let show: boolean;

    /**
     * The ID of the element to use for the portal.
     */
    export let portalSelector = "#portal";

    function close() {
        show = false;
    }
</script>

{#if show}
    <div use:portal={portalSelector}>
        <div
            class="w-screen h-screen z-10 flex items-center justify-center overflow-auto "
        >
            <div
                class="bg-black opacity-60 inset-0 absolute z-20"
                on:click={close}
            />
            <div class="z-30">
                <slot />
            </div>
        </div>
    </div>
{/if}
