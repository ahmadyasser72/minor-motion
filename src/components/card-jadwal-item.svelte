<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import * as Tooltip from "$lib/components/ui/tooltip";

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

  <Tooltip.Root openDelay={200}>
    <Tooltip.Trigger asChild let:builder>
      <Badge class="uppercase" href="/tugas/{id}" builders={[builder]}>
        {id}
        <SquareArrowOutUpRight class="ml-1 w-4 h-4" />
      </Badge>
    </Tooltip.Trigger>
    <Tooltip.Content sideOffset={4}>
      <p>{nama}</p>
    </Tooltip.Content>
  </Tooltip.Root>

  {#if jumlahTugas.normal > 0}
    <Tooltip.Root openDelay={200}>
      <Tooltip.Trigger asChild let:builder>
        <Badge class="bg-indigo-600 hover:bg-indigo-800" builders={[builder]}>
          <Info class="mr-1 w-4 h-4" />
          {jumlahTugas.normal}
        </Badge>
      </Tooltip.Trigger>
      <Tooltip.Content sideOffset={4}>
        <p>{jumlahTugas.normal} Tugas</p>
      </Tooltip.Content>
    </Tooltip.Root>
  {/if}

  {#if jumlahTugas.terlewat > 0}
    <Tooltip.Root openDelay={200}>
      <Tooltip.Trigger asChild let:builder>
        <Badge variant="destructive" builders={[builder]}>
          <CircleAlert class="mr-1 w-4 h-4" />
          {jumlahTugas.terlewat}
        </Badge>
      </Tooltip.Trigger>
      <Tooltip.Content sideOffset={4}>
        <p>{jumlahTugas.terlewat} Tugas Terlewat</p>
      </Tooltip.Content>
    </Tooltip.Root>
  {/if}
</div>
