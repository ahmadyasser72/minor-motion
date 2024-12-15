<script lang="ts">
  import CardJadwal from "./card-jadwal.svelte";

  import { Badge } from "$lib/components/ui/badge";
  import type { MapListJadwal, MapListTugasLewat } from "$lib/types";

  import { CircleAlert, Info } from "lucide-svelte";

  interface Props {
    dailyJadwalMap: MapListJadwal;
    allStatusTugasMap: MapListTugasLewat;
  }

  let { dailyJadwalMap, allStatusTugasMap }: Props = $props();
</script>

<div class="flex justify-end space-x-2">
  <Badge class="bg-indigo-600 uppercase hover:bg-indigo-800">
    <Info class="mr-1 h-4 w-4" />
    tugas
  </Badge>
  <Badge class="bg-red-600 uppercase hover:bg-red-800">
    <CircleAlert class="mr-1 h-4 w-4" />
    tugas (telat)
  </Badge>
</div>

<div class="mt-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
  {#each Object.entries(dailyJadwalMap) as [hari, dailyJadwal]}
    <CardJadwal {hari} {dailyJadwal} {allStatusTugasMap} />
  {/each}
</div>
