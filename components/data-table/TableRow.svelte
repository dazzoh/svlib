<tr data-pinned={pinned}>
    <TableRowHeader {row} {pinToBottom} {dataSource}/>

    {#each dataSource.columns as column, index}
        <TableCell {row} {column} {pinToBottom}
                   pinToRight={pinToRight && index===dataSource.columns.length -1}>
            <slot name="cell" slot="cell" let:row let:column {row} {column} />
        </TableCell>
    {/each}
</tr>

<script lang="ts">
    import {DataSource, Row} from "./data-source";
    import TableRowHeader from "./TableRowHeader.svelte";
    import TableCell from "./TableCell.svelte";

    export let row: Row;
    export let dataSource: DataSource;
    export let pinToBottom = false;

    let pinned = pinToBottom === true ? 'true' : undefined;
    let pinToRight = dataSource.options.pinLastColumn;
</script>
