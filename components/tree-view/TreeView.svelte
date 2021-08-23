<ul>
    {#each dataSource.nodes as node}
        {#if isBranchNode(node)}
            <BranchNode {node} depth={0}>
                <slot name="branch" slot="branch" let:node {node}  />
                <slot name="leaf"  slot="leaf" let:node {node}   />
            </BranchNode>
        {:else}
            <LeafNode  {node} depth={0} >
                <slot name="leaf" slot="leaf" let:node {node}  />
            </LeafNode>
        {/if}
    {/each}
</ul>

<script lang="ts">
    import BranchNode from "./BranchNode.svelte";
    import LeafNode from "./LeafNode.svelte";
    import type {TreeDataSource} from "./tree-view";
    import {isBranchNode} from "./tree-view";

    export let dataSource: TreeDataSource;
</script>
