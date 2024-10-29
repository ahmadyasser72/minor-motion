<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import type { TugasState } from "$lib/types";

  import { Ban, TrendingDown, TrendingUp } from "lucide-svelte";

  export let state: TugasState;
</script>

{#if state === "sudah"}
  <Badge class="bg-indigo-600 hover:bg-indigo-800 w-20">
    <TrendingUp class="w-4 h-4 mr-1" />
    done
  </Badge>
{:else if state === "belum"}
  <Badge class="bg-sky-500 hover:bg-sky-700 w-20">
    <TrendingDown class="w-4 h-4 mr-1" />
    belum
  </Badge>
{:else if state === "telat"}
  <Badge class="bg-red-700 hover:bg-red-900 w-20">
    <Ban class="w-4 h-4 mr-1" />
    telat
  </Badge>
{/if}
