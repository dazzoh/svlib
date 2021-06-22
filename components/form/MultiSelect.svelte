<div class='flex min-w-[5rem]'>
    <DropDownButton disabled={disabled || !items?.length}>
        <span slot="label">
            {buttonContent}
        </span>
        <div class='overflow-auto max-h-[25rem] p-2' slot="content">
            {#if listGroups}
                <MultiTreeList bind:value={value}
                               on:change={onChange}
                               {items}
                               {listGroups}
                               {key}
                               {display}/>
            {:else }
                <MultiList bind:value={value}
                           on:change={onChange}
                           {items}
                           {key}
                           {display}/>
            {/if}
        </div>
    </DropDownButton>
</div>

<script lang="ts">
    import type {TemplateDefinition} from "../../util/svelte-utils";
    import {createTemplateRenderer} from "../../util/svelte-utils";
    import {createEventDispatcher} from "svelte";
    import DropDownButton from "../button/DropDownButton.svelte";
    import MultiList from "./MultiList.svelte";
    import MultiTreeList from "./MultiTreeList.svelte";

    const dispatch = createEventDispatcher<{ change: any }>();

    export let key: string = undefined; // object property key for checking if is selected
    export let items: any[];
    export let value: any[] = []; // model values
    export let listGroups: string[] = undefined;
    export let display: TemplateDefinition = undefined;
    export let defaultLabel = ""; // label when nothing selected
    export let disabled = false;

    console.assert(Array.isArray(value), "value must be an array")

    const render = createTemplateRenderer(display); // label generator

    let buttonContent = "";

    $: {
        if (value != null) {
            setButtonLabel()
        }
    }

    function onChange(event: CustomEvent) {
        setButtonLabel();
        dispatch("change", event.detail);
    }

    function setButtonLabel() {
        if (value.length == 0) {
            buttonContent = defaultLabel;
            return;
        }
        let i = 0;
        let label = '';
        for (let item of value) {
            i++;
            label += ` ${render(item)},`;
            // only use labels from first 3
            if (i == 3) {
                if (value.length > i) {
                    label += '...';
                    buttonContent = label.substring(1);
                    return;
                }
                break;
            }
        }
        buttonContent = label.substring(1, label.length - 1);
    }


</script>

