<script lang="ts">
    import { focusLost } from "../../actions/focus-lost";
    import { portal } from "../../actions/portal";
    import { createEventDispatcher } from "svelte";

    export let disabled = false;
    export let show = false;
    /**
     * override the selector for the portal
     */
    export let portalSelector = "#portal";

    const dispatch = createEventDispatcher<{ shown: boolean }>();

    let component: HTMLElement;
    let button: HTMLButtonElement;
    let content: HTMLElement;
    // values for positioning the content in the viewport
    let top = 0;
    let left = 0;

    function click(e: MouseEvent) {
        e.stopImmediatePropagation();
        toggle(!show);
    }

    function toggle(value: boolean) {
        if (show == value) {
            return;
        }
        show = value;
        dispatch("shown", show);
    }

    $: {
        if (button) {
            const buttonOffsets = button.getBoundingClientRect();
            top = buttonOffsets.bottom;
            left = buttonOffsets.left;
        }
    }
</script>

<span
    bind:this={component}
    class="flex-1 flex relative flex-shrink-0 min-w-0"
    class:disabled
>
    <button
        on:click={click}
        bind:this={button}
        class="btn pl-1 flex flex-1 text-left min-w-0 items-center"
        {disabled}
    >
        <span class="buttonLabel">
            <slot name="label" />
        </span>
    </button>
    {#if show}
        <div use:portal={portalSelector}>
            <div
                bind:this={content}
                use:focusLost={{
                    callback: () => {
                        toggle(false);
                    },
                }}
                class="content"
                style="top: {top}px; left:{left}px"
            >
                <slot name="content" />
            </div>
        </div>
    {/if}
</span>

<style lang="postcss">
    .btn {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 1rem;
        height: var(--height-form-control);
        border: 1px solid var(--color-primary);
    }

    .disabled {
        opacity: 0.5;
    }

    .buttonLabel {
        @apply min-w-0 whitespace-nowrap overflow-hidden overflow-ellipsis;
    }

    .content {
        @apply fixed z-10 rounded bg-white shadow-md;
        border: 1px solid gainsboro;
        box-shadow: 0 0 8px 0 #0000004f;
        transform: translateZ(0);
    }
</style>
