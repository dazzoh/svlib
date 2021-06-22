<StickyCell colspan={1} {rowIndex} cellType="tableHeaderCell" {pinToRight}>
    {column.label}
</StickyCell>
<script lang="ts">
    import {Column, DataSource} from "./data-source";
    import StickyCell from "./StickyCell.svelte";

    export let column: Column;
    // export let dataSource: DataSource;
    export let rowIndex: number;
    export let pinToRight = false;

</script>
