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
      <TrendingUp class="w-4 h-4 mr-1" />
      done
    </Badge>
  {:else if status === StatusTugas.belum}
    <Badge class="bg-orange-500 hover:bg-orange-700 {className}">
      <TrendingDown class="w-4 h-4 mr-1" />
      belum
    </Badge>
  {:else if status === StatusTugas.terlambat}
    <Badge class="bg-red-700 hover:bg-red-900 {className}">
      <Ban class="w-4 h-4 mr-1" />
      telat
    </Badge>
  {/if}

  {#snippet fallback()}
    <span class="inline-flex justify-center py-0.5 {className}">
      <LoaderCircle class="w-4 h-4 animate-spin" />
    </span>
  {/snippet}
</ClientOnly>
