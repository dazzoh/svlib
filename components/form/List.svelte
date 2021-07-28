<script lang="typescript">
    import { createEventDispatcher } from "svelte";
    import { createTemplateRenderer } from "../../util/svelte-utils";

    export let items: any[];
    export let value: any = undefined;
    export let key: string | undefined = undefined; // property key for checking if is selected
    export let display: string | ((item: any) => string) | undefined =
        undefined;

    let dispatch = createEventDispatcher<{ change: any }>();

    const isSelected = key
        ? (item: any, value:any) => value != undefined && item[key!] == value[key!]
        : (item: any, value:any) => item == value;

    const render = createTemplateRenderer(display);

    $:{
        console.log(value)
    }

    function click(item: any) {
        value = item;        
        dispatch("change", item);
    }
</script>

<ul>
    {#each items as item}
        <li
            class="item"
            on:click={() => click(item)}
            class:selected={isSelected(item,value)}
        >
            <slot {item}>
                {render(item)}
            </slot>
        </li>
    {/each}
</ul>

<style lang="postcss">
    .item {
        @apply whitespace-nowrap p-2 flex items-center flex-1 cursor-pointer;

        > :global(*) {
            flex: 1;
        }

        &:hover {
            @apply bg-dark-700;
        }
    }

    .selected {
        font-weight: bold;
    }
</style>
