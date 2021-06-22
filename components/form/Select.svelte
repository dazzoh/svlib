<div class='flex min-w-[5rem]' on:wheel={ev=>cycleOptions(ev.deltaY > 0)}>
    <DropDownButton bind:show={show}
                    disabled={disabled || !items?.length}>
        <span slot="label">
            {buttonContent}
        </span>
        <div class='overflow-auto max-h-[25rem]' slot="content">
            {#if listGroups}
                <TreeList {items}
                          {listGroups}
                          {value}
                          {key}
                          display={render}
                          on:change={onChange}/>
            {:else }
                <List {items}
                      bind:value={value}
                      {key}
                      on:change={onChange}
                      display={render}/>
            {/if}
        </div>
    </DropDownButton>
</div>

<script lang="ts">
    import type {TemplateDefinition} from "../../util/svelte-utils";
    import {createTemplateRenderer} from "../../util/svelte-utils";
    import {createEventDispatcher} from "svelte";
    import DropDownButton from "../button/DropDownButton.svelte";
    import TreeList from "./TreeList.svelte";
    import List from "./List.svelte";
    import {createComparator, findIndex} from "./form";

    const dispatch = createEventDispatcher<{ change: any }>();

    export let key: string = undefined; // object property key for checking if is selected
    export let items: any[];
    export let value: any = undefined; // model value
    export let listGroups: string[] = undefined;
    export let display: TemplateDefinition = undefined;
    export let defaultLabel = ""; // label when nothing selected
    export let disabled = false;

    let show = false;
    let buttonContent = "";
    let currentIndex = -1; // index in items of selected value. Used for moving through list to set the value - eg: mousewheel on Select component.

    const render = createTemplateRenderer(display); // label generator
    const compare = createComparator(key);

    $: {
        if (value != null) {
            setButtonLabel()
        }
    }

    /**
     * Handle change from the List
     * @param event
     */
    function onChange(event: CustomEvent) {
        show = false;
        setItem(event.detail);
    }

    function setItem(item: any, itemIndex = -1) {
        buttonContent = render(item);
        value = item;
        dispatch("change", item);
        currentIndex = itemIndex;
    }

    function setButtonLabel() {
        buttonContent = value == undefined ? defaultLabel : render(value);
    }

    /**
     * Cycle through the list of options setting the next or previous item as the selected value.
     *  Does not wrap around the items array.
     * @param forwards
     */
    function cycleOptions(forwards: boolean) {
        try {
            if (items && items.length > 0) {
                if (currentIndex === -1 && value != null) { // not set yet or reset by list event, find position of current item
                    currentIndex = findIndex(items, value, compare)
                }
                let index = forwards ? Math.min(currentIndex + 1, items.length - 1) : Math.max(currentIndex - 1, 0);
                if (index != currentIndex) {
                    setItem(items[index], index);
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }

</script>
