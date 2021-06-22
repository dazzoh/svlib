<script lang="ts" context="module">
    import { formatISO } from "date-fns";
    /**
     * Formats a date object in in ISO 8601 format, date only (YYYY-MM-DD)
     * @param date
     */
    export function formatDate(date: Date = new Date()): string {
        return formatISO(date, { representation: "date" });
    }
</script>

<script lang="ts">
    export let value: string;
</script>

<input type="date" required bind:value />

<style lang="postcss">
    input {
        color: black;
    }
</style>
