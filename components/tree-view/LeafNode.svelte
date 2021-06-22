<script lang="ts">
  import type { Leaf } from "./tree-view";

  export let depth: number;
  export let node: Leaf;
</script>

<li data-leaf style="padding-left: {depth * 1.5}rem" class="flex">
  <slot name="leaf" {node}>
    {node.label}
  </slot>
</li>
