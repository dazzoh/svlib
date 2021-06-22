<StickyCell colspan={columnGroup.colSpan}
            {rowIndex}
            {pinToRight}
            cellType={columnGroup.isFiller?"fillerCell":"contentCell"}>
    {columnGroup.label}
</StickyCell>
<script lang="ts">
    import {ColumnGroupCellViewModel} from "./data-source";
    import StickyCell from "./StickyCell.svelte";

    export let columnGroup: ColumnGroupCellViewModel;
    export let rowIndex: number;
    export let pinToRight = false;
</script>
