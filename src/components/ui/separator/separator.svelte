<script lang="ts">
  import { cn } from "$lib/utils.js";

  import type { Separator as SeparatorPrimitive } from "bits-ui";

  let {
    class: className,
    orientation = "horizontal",
  }: Pick<SeparatorPrimitive.RootProps, "class" | "orientation"> = $props();
</script>

<div
  class={cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-[1px] w-full" : "min-h-full w-[1px]",
    className
  )}
></div>
