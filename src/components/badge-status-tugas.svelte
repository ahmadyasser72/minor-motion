<script lang="ts">
  import ClientOnly from "./client-only.svelte";

  import { Badge } from "$lib/components/ui/badge";
  import { StatusTugas } from "$lib/types";

  import { Ban, LoaderCircle, TrendingDown, TrendingUp } from "lucide-svelte";

  interface Props {
    status: StatusTugas;
  }

  let { status }: Props = $props();

  const className = "w-20 uppercase";
</script>

<ClientOnly>
  {#if status === StatusTugas.sudah}
    <Badge class="bg-indigo-600 hover:bg-indigo-800 {className}">
      <TrendingUp class="mr-1 h-4 w-4" />
      done
    </Badge>
  {:else if status === StatusTugas.belum}
    <Badge class="bg-orange-500 hover:bg-orange-700 {className}">
      <TrendingDown class="mr-1 h-4 w-4" />
      belum
    </Badge>
  {:else if status === StatusTugas.terlambat}
    <Badge class="bg-red-700 hover:bg-red-900 {className}">
      <Ban class="mr-1 h-4 w-4" />
      telat
    </Badge>
  {/if}

  {#snippet fallback()}
    <span class="inline-flex justify-center py-0.5 {className}">
      <LoaderCircle class="h-4 w-4 animate-spin" />
    </span>
  {/snippet}
</ClientOnly>
