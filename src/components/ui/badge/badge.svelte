<script lang="ts">
  import { builderActions, getAttrs, type Builder } from "bits-ui";

  import { type Variant, badgeVariants } from "./index.js";
  import { cn } from "$lib/utils.js";

  let className: string | undefined | null = undefined;
  export let builders: Builder[] = [];
  export let href: string | undefined = undefined;
  export let variant: Variant = "default";
  export { className as class };
</script>

<svelte:element
  this={href ? "a" : "span"}
  {href}
  class={cn(badgeVariants({ variant, className }))}
  {...$$restProps}
  use:builderActions={{ builders }}
  {...getAttrs(builders)}
>
  <slot />
</svelte:element>
