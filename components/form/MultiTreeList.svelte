<TreeView dataSource={dataSource}>
    <li slot="leaf" class="item" let:node>
        <CheckBox label={node.label} value={node.selected} on:change={event => toggleNode(node, event.detail)}/>
    </li>
    <li slot="branch" class="item" let:node>
        <CheckBox label={node.label} value={node.selected} on:change={event => toggleChildren(node,event.detail)}/>
    </li>
</TreeView>

<script lang="ts">
    import type {TemplateDefinition} from "../../util/svelte-utils";
    import {createTemplateRenderer} from "../../util/svelte-utils";
    import type {Branch, Leaf, TreeDataSource} from "../tree-view";
    import {getLeafNodes, newTreeViewDataSource} from "../tree-view";
    import {contains, createComparator} from "./form";
    import {createEventDispatcher} from "svelte";
    import TreeView from "../tree-view/TreeView.svelte";
    import CheckBox from "./CheckBox.svelte";

    export let key: string = undefined; // object property key for checking if is selected
    export let items: any[];
    export let value: any[] = [];
    export let listGroups: string[];
    export let display: TemplateDefinition = undefined;

    const dispatch = createEventDispatcher<{ change: any[] }>();
    const compare = createComparator(key);
    const render = createTemplateRenderer(display); // label generator

    let dataSource: TreeDataSource;

    $: {
        if (Array.isArray(items)) {
            dataSource = newTreeViewDataSource(items || [], listGroups, render)
        }
    }

    $: {
        if(Array.isArray(value) && dataSource){
            dataSource.leafNodes.forEach(leafNode=>{
                leafNode.toggleSelected(contains(value, leafNode.data, compare))

            })
        }
    }

    function toggleChildren(node: Branch, isSelected: boolean) {
        const items = getLeafNodes(node).map(leafNode => {
            leafNode
            return leafNode.data;
        });
        if (isSelected) {
            value.push(...items);
        } else {
            const remainingItems = value.filter(item => items.find(removalEntry => compare(item, removalEntry)) == undefined)
            value.splice(0, value.length, ...remainingItems);
        }
        node.toggleSelected(isSelected);

        dispatch("change", value);
    }

    function toggleNode(node: Leaf, isSelected: boolean) {
        if (isSelected) {
            value.push(node.data)
        } else {
            const indexToRemove = value.findIndex(item => !compare(item, node.data))
            console.assert(indexToRemove >= 0, "expecting the item to be in the list");
            value.splice(indexToRemove, 1);
        }
        node.toggleSelected(isSelected);

        dispatch("change", value);
    }

</script>
