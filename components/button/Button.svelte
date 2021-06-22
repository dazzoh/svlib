<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { ButtonKind, ButtonSize } from "./button";
  const dispatch = createEventDispatcher<{ click: MouseEvent }>();

  export let kind:ButtonKind = ButtonKind.Default;  
  export let disabled = false;
  export let className = "";
  export let type: "button" | "submit" | "reset" = "button";
  export let size: ButtonSize = ButtonSize.Default;
  export let waiting: Promise<any> | undefined = undefined;

  let clicked;

  function click(e: MouseEvent) {
    if (waiting || (e.currentTarget as HTMLButtonElement)!.disabled) {
      return; // waiting on promise to resolve or button is disabled
    }
    console.log("click");
    animateClick();
    dispatch("click", e);
  }

  function animateClick() {
    clicked = true;
    setTimeout(() => (clicked = false), 700);
  }
</script>

{#if kind === ButtonKind.Default}
  <button on:click={click} type={type ?? "button"} {disabled} data-button-size={size} class:waiting class={`btn bg-primary text-white rounded py-0.5 px-3 inline-flex justify-center items-center ${className ?? ""}`}>
    <!--        <Show when={waiting}>-->
    <!--            <ProgressRing diameter={15}/>-->
    <!--        </Show>-->
    <span><slot /></span>
  </button>
{:else if kind === ButtonKind.IconRound}
  <button on:click={click} type="button" {disabled} data-button-size={size} class:waiting class="btn iconRound">
    <slot />
  </button>
{/if}

<style lang="postcss">
  .btn {
    @apply h-form-control inline-flex justify-center items-center relative;

    &[data-button-size="0"] {
      height: calc(0.8 * var(--height-form-control));
    }

    &[data-button-size="1"] {
      height: var(--height-form-control);
    }

    &[data-button-size="2"] {
      height: calc(1.3 * var(--height-form-control));
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: none;
      opacity: 0.7;
    }

    &.iconRound {
      /**
              Styling for round button containing only an icon (no text).
            */

      @apply rounded-full bg-transparent;

      &:focus {
        outline: none;
        fill: var(--color-primary);
      }

      &:active {
        outline: none;
      }

      /* ButtonSize.Small */

      &[data-button-size="0"] {
        width: calc(0.8 * var(--height-form-control));
      }

      /* ButtonSize.Default */

      &[data-button-size="1"] {
        width: var(--height-form-control);
      }

      /* ButtonSize.Large */

      &[data-button-size="2"] {
        width: calc(1.3 * var(--height-form-control));
      }
    }
  }

  .waiting {
    cursor: auto;
  }
</style>
