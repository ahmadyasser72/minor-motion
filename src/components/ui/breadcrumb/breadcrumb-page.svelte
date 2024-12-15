<script lang="ts">
  import { cn } from "$lib/utils.js";

  import type { HTMLAttributes } from "svelte/elements";

  import type { WithElementRef } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
  bind:this={ref}
  role="link"
  aria-disabled="true"
  aria-current="page"
  class={cn("font-normal text-foreground", className)}
  {...restProps}
>
  {@render children?.()}
</span>
