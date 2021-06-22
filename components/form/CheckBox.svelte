<label class='inline-flex items-end justify-start'>
    <input class='mr-2' type='checkbox' bind:checked={$_value} on:input={onInput}/>
    <span class='leading-none'>{label}</span>
</label>

<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import type {Store} from "../../util/observable/store";
    import {createStore} from "../../util/observable/store";

    export let value: boolean | Store<boolean> = false;
    export let label: string;

    let _value =  typeof value == "boolean" ? createStore(value):value;

    const dispatch = createEventDispatcher<{ change: boolean }>();

    function onInput(e) {
        if (typeof value == "object") {
            value.set(e.currentTarget.checked);
        } else {
            value = e.currentTarget.checked;
        }
        dispatch("change", e.currentTarget.checked);
    }
</script>


