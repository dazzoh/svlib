<ul>
    {#each items as item}
        <li class="item"
            on:click={()=>click(item)}
            class:selected={isSelected(item)}>
            <slot {item}>
                {render(item)}
            </slot>
        </li>
    {/each}
</ul>

<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {createTemplateRenderer} from "../../util/svelte-utils";

    export let items: any[];
    export let value = undefined;
    export let key: string = undefined; // property key for checking if is selected
    export let display: string | ((item: any) => string) = undefined;

    let dispatch = createEventDispatcher<{ change: any }>();

    const isSelected = key ?
        item => value != undefined && item[key] == value[key] :
        item => item == key;

    const render = createTemplateRenderer(display);

    function click(item: any) {
        value = item;
        dispatch("change", item);
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
