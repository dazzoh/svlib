<thead>
{#each dataSource.columnGroupRows as groupRow, index}
    <TableHeaderGroupRow dataSource={dataSource}
                         groupRow={groupRow}
                         rowIndex={index}/>
{/each}
<tr>
    {#if dataSource?.options?.rowHeaderColumnHeader}
        <StickyCell rowIndex={columnRowIndex} colspan={1} className={`left-0 z-20`}/>
    {/if}
    {#each dataSource?.columns as column, index}
        <TableHeaderCell rowIndex={columnRowIndex}
                         column={column}
                         pinToRight={pinToRight && index === dataSource.columns.length - 1}
                        />
    {/each}
</tr>
</thead>

<script lang="ts">

    import {DataSource} from "./data-source";
    import TableHeaderCell from "./TableHeaderCell.svelte";
    import TableHeaderGroupRow from "./TableHeaderGroupRow.svelte";
    import StickyCell from "./StickyCell.svelte";

    export let dataSource: DataSource;

    const columnRowIndex = dataSource.columnGroupRows.length;
    const pinToRight = dataSource.options.pinLastColumn;

</script>
