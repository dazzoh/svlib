<span>
    {#each items as item}
              <button class='Btn m-0 toggleButton'
                      type='button'
                      data-selected={contains(items,item, comparator)}
                      onClick={[select, item]}>
                  {renderer(item)}
              </button>
        {/each}
</span>

<script lang="ts">

    import type {TemplateDefinition} from "../../util/svelte-utils";
    import {createTemplateRenderer} from "../../util/svelte-utils";
    import {createEventDispatcher} from "svelte";
    import {contains, createComparator} from "./form";

    const dispatch = createEventDispatcher<{ change: any }>();

    export let key: string = undefined; // object property key for checking if is selected
    export let items: any[] = [];
    export let value: any = undefined; // model value
    export let display: TemplateDefinition = undefined;

    const renderer = createTemplateRenderer(display);
    const comparator = createComparator(key);

    function select(item: any) {
        value = item;
        dispatch("change", item);
    }

</script>


<style lang="postcss">
    .toggleButton {
        background: white; /* var(--color-body);*/
        color: var(--color-body-text);
        border: 1px solid var(--color-primary);
        outline: none;

        &[data-selected="true"] {
            background: var(--color-primary);
            color: white;
        }

        &:focus {
            outline: none !important;
        }
    }

    .toggleButton + .toggleButton {
        border-left: none;
    }

    .toggleButton:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .toggleButton:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .toggleButton:not(:first-child):not(:last-child) {
        border-radius: 0;
    }

</style>
