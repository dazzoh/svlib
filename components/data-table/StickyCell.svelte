<th class='sticky  z-15 {cellType} {className}'
    class:right-0={pinToRight}
    class:z-20={pinToRight}
    style="height: 2rem; top: {2 * rowIndex}rem"
    {colspan}>
    <span><slot/></span>
</th>
<script lang="ts">
    export let colspan: number;
    export let rowIndex: number;
    export let className: string = "";
    export let pinToRight = false;

    export let cellType: "fillerCell" | "contentCell" | "tableHeaderCell" |  "" = "";

</script>

<style lang="postcss">
    .tableHeaderCell::after {
        bottom: -5px;
        content: "";
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        height: 5px;
        background: linear-gradient(to bottom, black, transparent);
        opacity: .1;
    }

    .fillerCell {
        z-index: 15!important;
    }

    .contentCell {
        z-index: 18 !important;
    }
</style>
