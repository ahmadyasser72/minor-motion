<script lang="ts">
  import CardJadwalContent from "./card-jadwal-content.svelte";

  import * as Card from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import type { ListJadwal, MapListTugasLewat } from "$lib/types";
  import { dayNames } from "$lib/utils.date";

  interface Props {
    hari: string;
    active?: any;
    dailyJadwal: ListJadwal;
    allStatusTugasMap: MapListTugasLewat;
  }

  let {
    hari,
    active = dayNames[new Date().getDay() - 1] === hari,
    dailyJadwal,
    allStatusTugasMap,
  }: Props = $props();
</script>

<Card.Root
  class="border-primary {active ? 'border-2 border-solid' : 'border-dashed'}"
>
  <Card.Header>
    <Card.Title class="uppercase">{hari}</Card.Title>
  </Card.Header>
  <Card.Content>
    {#each dailyJadwal as jadwal, idx}
      {#if idx > 0}
        <Separator class="my-2" />
      {/if}

      <CardJadwalContent
        {jadwal}
        allStatusTugas={allStatusTugasMap[jadwal.id]}
      />
    {/each}
  </Card.Content>
</Card.Root>
