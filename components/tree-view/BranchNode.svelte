<li style="padding-left: {depth}rem" class='flex items-center'>
    <Button kind={ButtonKind.IconRound}
            size={ButtonSize.Small}
            onClick={click}>
        <IconTriangle diameter='.5rem' rotate={$collapsed ? '-90deg' : '0'}/>
    </Button>
    <slot name="branch" {node}>
        {node.label}
    </slot>
</li>
{#if !$collapsed}
    <ul>
        {#each node.children as childNode}
            {#if isBranchNode(childNode)}
                <svelte:self node={childNode} depth={depth + 1}>
                    <slot name="branch" slot="branch" let:node {node}/>
                    <slot name="leaf" slot="leaf" let:node {node}/>
                </svelte:self>
            {:else }
                <LeafNode node={childNode} depth={depth + 1}>
                    <slot name="leaf" slot="leaf" let:node {node}/>
                </LeafNode>
            {/if}
        {/each}
    </ul>
{/if}

<script lang="ts">
    import type {Branch} from "./tree-view";
    import {isBranchNode} from "./tree-view";
    import Button from "../button/Button.svelte";
    import {ButtonKind, ButtonSize} from "../button/button";
    import IconTriangle from "../icon/IconTriangle.svelte";
    import LeafNode from "./LeafNode.svelte";

    export let node: Branch;
    export let depth: number;

    let collapsed = node.collapsed; // create local reference in order to access reactively in template

    function click() {
        node.collapsed.set(!node.collapsed.get())
        console.log(node.collapsed.get())
    }

</script>

