<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    fallback: Snippet;
  }

  let { children, fallback }: Props = $props();
</script>

{#if !import.meta.env.SSR}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
