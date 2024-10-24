<script lang="ts">
  import CardJadwalItem from "./card-jadwal-item.svelte";

  import * as Card from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import { daftarHari } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  export let hari: string;
  export let active = daftarHari[new Date().getDay() - 1] === hari;
  export let jadwal: Array<CollectionEntry<"mata-kuliah">>;
  export let daftarJumlahTugas: Record<
    CollectionEntry<"mata-kuliah">["id"],
    JumlahTugas
  >;
</script>

<Card.Root
  class="border-primary {active ? 'border-solid border-2' : 'border-dashed'}"
>
  <Card.Header>
    <Card.Title class="uppercase">{hari}</Card.Title>
  </Card.Header>
  <Card.Content>
    {#each jadwal as entry, idx}
      {#if idx > 0}
        <Separator class="my-2" />
      {/if}

      <CardJadwalItem {entry} jumlahTugas={daftarJumlahTugas[entry.id]} />
    {/each}
  </Card.Content>
</Card.Root>
