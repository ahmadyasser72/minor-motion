<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { tasks } from "$lib/stores";
  import type { ListJadwal, ListStatusTugas } from "$lib/types";

  import { CircleAlert, Info, SquareArrowOutUpRight } from "lucide-svelte";

  export let jadwal: ListJadwal[number];
  export let allStatusTugas: ListStatusTugas;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatTime = ({ hour, minute }: typeof jadwal.start) =>
    `${pad(hour)}:${pad(minute)}`;

  let jumlahTugas = 0;
  let jumlahTugasLewat = 0;
  $: {
    jumlahTugas = jumlahTugasLewat = 0;
    for (const [id, status] of allStatusTugas) {
      if ($tasks.isDone(id)) continue;

      if (status === "normal") jumlahTugas += 1;
      else if (status === "lewat") jumlahTugasLewat += 1;
    }
  }
</script>

<div class="inline-flex items-center space-x-1.5">
  <Badge variant="secondary">
    {formatTime(jadwal.start)} - {formatTime(jadwal.end)}
  </Badge>

  <Badge class="uppercase" href="/tugas/{jadwal.id}">
    {jadwal.id}
    <SquareArrowOutUpRight class="ml-1 w-4 h-4" />
  </Badge>

  {#if jumlahTugas > 0}
    <Badge class="bg-indigo-600 hover:bg-indigo-800">
      <Info class="mr-1 w-4 h-4" />
      {jumlahTugas}
    </Badge>
  {/if}

  {#if jumlahTugasLewat > 0}
    <Badge class="bg-red-600 hover:bg-red-800">
      <CircleAlert class="mr-1 w-4 h-4" />
      {jumlahTugasLewat}
    </Badge>
  {/if}
</div>
