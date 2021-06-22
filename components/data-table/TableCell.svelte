{#if (pinned) }
    <th class={buildStyles()}>
        <slot name="cell" {row} {column}>
            {row.getCell(column)}
        </slot>
    </th>
{:else }
    <td class={buildStyles()}>
        <slot name="cell" {row} {column}>
            {row.getCell(column)}
        </slot>
    </td>
{/if}

<script lang="ts">
    import {Column, Row} from "./data-source";

    export let row: Row;
    export let column: Column;
    export let pinToBottom = false;
    export let pinToRight = false;
    // export let dataSource: DataSource;

    let pinned = pinToBottom || pinToRight;

    function buildStyles() {

        let classNames = 'px-2 border-0';
        if (column.dataType == 'number') {
            classNames += ' text-right';
        }

        // const tmplFn = dataSource.options.cellTemplateBuilder;

        if (pinned) {

            classNames += ' z-10 sticky';

            if (pinToBottom) {
                classNames += "  bottom-0";
            }

            if (pinToRight) {
                classNames += "  right-0";
            }
        }
        return classNames;
    }

</script>
