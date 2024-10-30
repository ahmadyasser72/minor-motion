{#if typeof document !== "undefined"}
  <slot />
{:else}
  <slot name="fallback" />
{/if}
