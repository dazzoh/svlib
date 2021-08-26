<script lang="ts">
</script>

<div class="container">
    <div class="bar" />
</div>

<style lang="postcss">
    .container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        z-index: 20;
    }
    .bar {
        position: absolute;
        @apply bg-green-600;
        height: 2px;
        width: auto;
        top: 0;
        animation-name: progressBar;
        animation-iteration-count: 112;
        animation-duration: 2s;
        animation-timing-function: linear;
    }

    @keyframes progressBar {
        0% {
            left: 0;
            right: 100%;
        }

        50% {
            left: 0;
            right: 0;
        }

        100% {
            right: 0;
            left: 100%;
        }
    }
</style>
