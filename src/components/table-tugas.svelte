<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from "$lib/components/ui/table";
  import { formatDate } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  import { Info } from "lucide-svelte";

  export let matkul: string;
  export let tugas: Array<CollectionEntry<"tugas">["data"] & { slug: string }>;
</script>

<Table.Root>
  <Table.Caption>Daftar tugas "{matkul}"</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>#</Table.Head>
      <Table.Head>Judul</Table.Head>
      <Table.Head>Tipe</Table.Head>
      <Table.Head>Batas Waktu</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#if tugas.length === 0}
      <Table.Row>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
    {:else}
      {#each tugas as data, idx}
        <Table.Row>
          <Table.Cell class="font-medium"
            >{(idx + 1).toString().padStart(2, "0")}</Table.Cell
          >
          <Table.Cell>{data.judul}</Table.Cell>
          <Table.Cell>{data.tipe}</Table.Cell>
          <Table.Cell>{formatDate(data["batas-waktu"])}</Table.Cell>
          <Table.Cell>
            <Button
              href="/tugas/{data.slug}"
              class="uppercase"
              variant="outline"
            >
              <Info class="mr-1 w-4 h-4" />
              detail
            </Button>
          </Table.Cell>
        </Table.Row>
      {/each}
    {/if}
  </Table.Body>
</Table.Root>
