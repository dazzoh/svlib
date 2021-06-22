<tr>
    {#if dataSource.options.rowHeaderColumnHeader}
        <StickyCell {rowIndex} colspan={1} className='left-0 z-20' />
    {/if}
    {#each groupRow as columnGroup, index }
        <TableHeaderGroupCell rowIndex={rowIndex} columnGroup={columnGroup}
                              pinToRight={pinToRight && index === groupRow.length - 1} />
        {/each}
</tr>

<script lang="ts">
    import {ColumnGroupCellViewModel, DataSource} from "./data-source";
    import StickyCell from "./StickyCell.svelte";
    import TableHeaderGroupCell from "./TableHeaderGroupCell.svelte";

    export let dataSource: DataSource;
    export let groupRow: ColumnGroupCellViewModel[];
    export let rowIndex: number;
    export let pinToRight = false;
</script>
