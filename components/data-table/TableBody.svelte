<tbody class="tbody">
{#each dataSource?.rows as row, index}
    <TableRow row={row} dataSource={dataSource}
              pinToBottom={pinLast && index === dataSource.rows.length - 1}>
        <slot name="cell" slot="cell" let:row let:column {row} {column} />
    </TableRow>

{/each}
</tbody>

<script lang="ts">
    import {DataSource} from "./data-source";
    import TableRow from "./TableRow.svelte";

    export let dataSource: DataSource;

    const pinLast = dataSource?.options.pinLastRow ?? false;
</script>

<style lang="postcss">
    .tbody :global(tr:hover td), :global(tr:hover th) {
        @apply bg-primary-xxlight
    }
</style>
