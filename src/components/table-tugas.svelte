<script lang="ts">
  import ButtonDoneTask from "./button-done-task.svelte";

  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";
  import { tasks } from "$lib/stores";
  import type { TaskId } from "$lib/types";
  import { formatDate } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  import { Info } from "lucide-svelte";

  export let matkul: string;
  export let tugas: Array<CollectionEntry<"tugas">["data"] & { slug: TaskId }>;

  const { completed } = tasks;
</script>

<Table.Root>
  <Table.Caption>Daftar tugas "{matkul}"</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>#</Table.Head>
      <Table.Head>
        <div class="min-w-[180px]">Judul</div>
      </Table.Head>
      <Table.Head class="max-sm:hidden">
        <div class="min-w-[60px]">Tipe</div>
      </Table.Head>
      <Table.Head>
        <div class="min-w-[90px]">Batas Waktu</div>
      </Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#if tugas.length === 0}
      <Table.Row>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell class="max-sm:hidden">-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
    {:else}
      {#each tugas as data, idx}
        {@const done = $completed.has(data.slug)}
        <Table.Row class={done ? "task-done" : ""}>
          <Table.Cell class="font-medium"
            >{(idx + 1).toString().padStart(2, "0")}</Table.Cell
          >
          <Table.Cell>
            <a class="underline" href="/tugas/{data.slug}">{data.judul}</a>
          </Table.Cell>
          <Table.Cell class="max-sm:hidden">{data.tipe}</Table.Cell>
          <Table.Cell>{formatDate(data["batas-waktu"])}</Table.Cell>
          <Table.Cell class="task-actions">
            <div class="flex space-x-1">
              <ButtonDoneTask class="w-24" id={data.slug} {done} />
              <Button href="/tugas/{data.slug}" class="uppercase">
                <Info class="mr-1 w-4 h-4" />
                detail
              </Button>
            </div>
          </Table.Cell>
        </Table.Row>
      {/each}
    {/if}
  </Table.Body>
</Table.Root>

<style>
  :global {
    .task-done td:not(.task-actions) {
      @apply opacity-25 hover:opacity-100;
    }
  }
</style>
