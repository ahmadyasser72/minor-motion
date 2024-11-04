<script lang="ts">
  import CardJadwal from "./card-jadwal.svelte";

  import { Badge } from "$lib/components/ui/badge";
  import type { ListJadwalMap, ListStatusTugasMap } from "$lib/types";
  import { CircleAlert, Info } from "lucide-svelte";

  interface Props {
    dailyJadwalMap: ListJadwalMap;
    allStatusTugasMap: ListStatusTugasMap;
  }

  let { dailyJadwalMap, allStatusTugasMap }: Props = $props();
</script>

<div class="flex justify-end space-x-2">
  <Badge class="uppercase bg-indigo-600 hover:bg-indigo-800">
    <Info class="w-4 h-4 mr-1" />
    tugas
  </Badge>
  <Badge class="uppercase bg-red-600 hover:bg-red-800">
    <CircleAlert class="mr-1 w-4 h-4" />
    tugas (telat)
  </Badge>
</div>

<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
  {#each Object.entries(dailyJadwalMap) as [hari, dailyJadwal]}
    <CardJadwal {hari} {dailyJadwal} {allStatusTugasMap} />
  {/each}
</div>
