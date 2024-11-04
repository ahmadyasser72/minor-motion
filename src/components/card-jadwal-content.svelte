<script lang="ts">
  import ClientOnly from "./client-only.svelte";

  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Badge } from "$lib/components/ui/badge";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { tasks } from "$lib/stores";
  import type { ListJadwal, ListStatusTugas, TugasId } from "$lib/types";

  import {
    CircleAlert,
    type Icon as IconType,
    Info,
    LoaderCircle,
    SquareArrowOutUpRight,
  } from "lucide-svelte";

  interface Props {
    jadwal: ListJadwal[number];
    allStatusTugas: ListStatusTugas;
  }

  let { jadwal, allStatusTugas }: Props = $props();

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatTime = ({ hour, minute }: typeof jadwal.start) =>
    `${pad(hour)}:${pad(minute)}`;

  const tugas = $derived.by(() => {
    const normal: TugasId[] = [];
    const lewat: TugasId[] = [];

    for (const [id, status] of allStatusTugas) {
      if ($tasks.isDone(id)) continue;

      if (status === "normal") normal.push(id);
      else if (status === "lewat") lewat.push(id);
    }

    return { normal, lewat };
  });
</script>

<div class="inline-flex items-center space-x-1.5">
  <Badge variant="secondary">
    {formatTime(jadwal.start)} - {formatTime(jadwal.end)}
  </Badge>

  <Badge class="uppercase" href="/tugas/{jadwal.id}">
    {jadwal.id}
    <SquareArrowOutUpRight class="ml-1 w-4 h-4" />
  </Badge>

  {#snippet tugasBadgeDropdown(
    tugas: TugasId[],
    badgeClass: string,
    Icon: typeof IconType
  )}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Badge class={badgeClass} {...props}>
            <Icon class="mr-1 w-4 h-4" />
            {tugas.length}
          </Badge>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="flex max-h-48">
        <ScrollArea class="flex-1">
          {#each tugas as id}
            <a href="/tugas/{id}">
              <DropdownMenu.Item class="flex flex-1 cursor-pointer">
                {id}
              </DropdownMenu.Item>
            </a>
          {/each}
        </ScrollArea>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  {/snippet}

  <ClientOnly>
    {#if tugas.normal.length > 0}
      {@render tugasBadgeDropdown(
        tugas.normal,
        "bg-indigo-600 hover:bg-indigo-800",
        Info
      )}
    {/if}

    {#if tugas.lewat.length > 0}
      {@render tugasBadgeDropdown(
        tugas.lewat,
        "bg-red-600 hover:bg-red-800",
        CircleAlert
      )}
    {/if}

    {#snippet fallback()}
      <LoaderCircle class="ml-1 w-4 h-4 animate-spin" />
    {/snippet}
  </ClientOnly>
</div>
