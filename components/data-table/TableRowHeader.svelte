{#if row.header}
    <th class={classNames}>{row.header.label}</th>
{/if}

<script lang="ts">
    import {Row} from "./data-source";

    export let row: Row;
    // export let dataSource: DataSource;
    export let pinToBottom = false;

    let classNames = "";

    if (row?.header) {
        classNames += 'sticky px-2 z-10 left-0 whitespace-nowrap';

        if (pinToBottom) {
            classNames += ' z-20 bottom-0';
        }
    }
</script>
