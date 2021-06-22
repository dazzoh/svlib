<ul>
    {#each items as item}
        <li class="item"
            on:click={(event)=>click(event.currentTarget, item)}
            class:selected={contains(value, item)}>
            <slot {item}>
                {render(item)}
            </slot>
        </li>
    {/each}
</ul>

<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {createTemplateRenderer} from "../../util/svelte-utils";
    import {createComparator} from "./form";

    export let items: any[];
    export let value = [];
    export let key: string = undefined; // property key for checking if is selected
    export let display: string | ((item: any) => string) = undefined;

    const dispatch = createEventDispatcher<{ change: any[] }>();
    const compare = createComparator(key);
    const render = createTemplateRenderer(display);

    console.assert(Array.isArray(value), "value must be an array")

    /**
     * Check if item is currently selected
     **/
    function contains(source:any[], searchItem: any): boolean {
        return source.find(item => compare(item, searchItem)) != undefined;
    }

    function click(element: HTMLElement, item: any) {
        const isSelected = contains(value, item);
        if (isSelected) {
            const indexToRemove = value.findIndex(entry => !compare(entry, item))
            console.assert(indexToRemove >= 0, "expecting the item to be in the list");
            value.splice(indexToRemove, 1);
        } else {
            value.push(item);
        }
        value = value;
        dispatch("change", value);
    }

</script>

<style lang="postcss">

    .item {
        @apply whitespace-nowrap p-2 flex items-center flex-1;

        > :global(*) {
            flex: 1;
        }

        &:hover {
            @apply bg-gray-200;
        }
    }

    .selected {
        font-weight: bold;
    }

</style>
