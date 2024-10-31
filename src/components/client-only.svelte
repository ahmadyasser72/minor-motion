<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    fallback: Snippet;
  }

  let { children, fallback }: Props = $props();
</script>

{#if typeof document !== "undefined"}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
