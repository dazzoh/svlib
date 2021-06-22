<table class="table">
    {#if dataSource}
        <TableHeader dataSource={dataSource}/>
        <TableBody dataSource={dataSource}>
            <slot name="cell" slot="cell" let:row let:column {row} {column} />
        </TableBody>
    {/if}
</table>

<script lang="ts">
    import {DataSource} from "./data-source";
    import TableHeader from "./TableHeader.svelte";
    import TableBody from "./TableBody.svelte";

    export let dataSource: DataSource;

</script>

<style lang="postcss">
    .table {

        --border-color: #ececec;
        position: relative;
        border-collapse: separate;
        border-spacing: 0;

        :global(td, th) {
            border: 1px solid var(--border-color);
            border-bottom: none;
            border-left: none;
        }


        :global( thead th) {
            background: white;
        }

        :global( thead th:first-child) {
            border-left: 1px solid var(--border-color);
        }

        :global(tbody tr:nth-child(even)  td, tbody tr:nth-child(even) th) {
            background: #f1f1f1;
        }

        :global(tbody tr:nth-child(odd)  td,tbody tr:nth-child(odd) th) {
            background: white;
        }

        :global(tbody tr:last-child td,tbody tr:last-child td th) {
            border-bottom: 1px solid var(--border-color);
        }

        :global(tbody  th:first-child) {
            border-left: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
        }

        :global(tbody  tr[data-pinned]  th::before) {
            top: -5px;
            content: "";
            left: 0;
            pointer-events: none;
            position: absolute;
            right: 0;
            height: 5px;
            background: linear-gradient(to top, black, transparent);
            opacity: .1;
        }

        :global(th) {
            color: var(--color-primary);
            font-weight: normal
        }
    }

</style>
