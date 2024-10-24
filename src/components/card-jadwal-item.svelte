<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";

  import type { CollectionEntry } from "astro:content";

  import { CircleAlert, Info, SquareArrowOutUpRight } from "lucide-svelte";

  export let entry: CollectionEntry<"mata-kuliah">;
  export let jumlahTugas: JumlahTugas;

  $: ({
    id,
    data: { nama, start, end },
  } = entry);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatTime = ({ hour, minute }: typeof start) =>
    `${pad(hour)}:${pad(minute)}`;
</script>

<div class="inline-flex items-center space-x-1.5">
  <Badge variant="secondary">{formatTime(start)} - {formatTime(end)}</Badge>

  <Badge class="uppercase" href="/tugas/{id}">
    {id}
    <SquareArrowOutUpRight class="ml-1 w-4 h-4" />
  </Badge>

  {#if jumlahTugas.normal > 0}
    <Badge class="bg-indigo-600 hover:bg-indigo-800">
      <Info class="mr-1 w-4 h-4" />
      {jumlahTugas.normal}
    </Badge>
  {/if}

  {#if jumlahTugas.terlewat > 0}
    <Badge class="bg-red-600 hover:bg-red-800">
      <CircleAlert class="mr-1 w-4 h-4" />
      {jumlahTugas.terlewat}
    </Badge>
  {/if}
</div>
