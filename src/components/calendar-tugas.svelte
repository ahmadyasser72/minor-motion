<script lang="ts">
  import BadgeStatusTugas from "./badge-status-tugas.svelte";
  import ClientOnly from "./client-only.svelte";

  import { Calendar } from "$lib/components/ui/calendar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { tasks } from "$lib/stores";
  import { StatusTugas, type ListBatasWaktuTugas } from "$lib/types";
  import { cn } from "$lib/utils";

  import {
    isSameDay,
    parseAbsoluteToLocal,
    type DateValue,
  } from "@internationalized/date";

  interface Props {
    allBatasWaktuTugas: ListBatasWaktuTugas;
  }

  let { allBatasWaktuTugas }: Props = $props();

  const getTugasByDate = (date: DateValue) => {
    const list = allBatasWaktuTugas
      .filter(([_, batasWaktu]) =>
        isSameDay(parseAbsoluteToLocal(batasWaktu.toISOString()), date)
      )
      .map(([id, batasWaktu]) => ({
        id,
        state: $tasks.getTugasState({ id, "batas-waktu": batasWaktu }),
      }))
      .sort((a, b) => a.state - b.state);

    if (list.length === 0) return false;

    let className =
      "bg-indigo-200 [&[data-today]:not([data-selected])]:bg-indigo-100";
    if (list.some(({ state }) => state === StatusTugas.terlambat))
      className = "bg-red-200 [&[data-today]:not([data-selected])]:bg-red-100";
    else if (list.some(({ state }) => state === StatusTugas.belum))
      className =
        "bg-orange-200 [&[data-today]:not([data-selected])]:bg-orange-100";

    return { list, className };
  };
</script>

<ClientOnly>
  {#snippet fallback()}
    <p>loading Calendar...</p>
  {/snippet}

  <Calendar
    type="single"
    readonly
    fixedWeeks
    weekdayFormat="short"
    weekStartsOn={1}
    locale="id-ID"
    class="border rounded-md"
  >
    {#snippet day(props, data, date)}
      {@const tugas = getTugasByDate(date)}
      {#if !tugas}
        <span {...props}>{data.day}</span>
      {:else}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <span {...props} class={cn([props.class, tugas.className])}>
              {data.day}
            </span>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="flex max-h-48">
            <ScrollArea>
              {#each tugas.list as data}
                <a href="/tugas/{data.id}">
                  <DropdownMenu.Item class="flex cursor-pointer">
                    <span class="flex-1">{data.id}</span>
                    <BadgeStatusTugas status={data.state} />
                  </DropdownMenu.Item>
                </a>
              {/each}
            </ScrollArea>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {/if}
    {/snippet}
  </Calendar>
</ClientOnly>
