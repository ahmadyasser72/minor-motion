<script lang="ts">
  import { Calendar } from "$lib/components/ui/calendar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { tasks } from "$lib/stores";
  import type { ListTugas, TugasState } from "$lib/types";
  import { cn } from "$lib/utils";

  import {
    isSameDay,
    parseAbsoluteToLocal,
    type DateValue,
  } from "@internationalized/date";
  import BadgeTaskState from "./badge-task-state.svelte";
  import ClientOnly from "./client-only.svelte";

  interface Props {
    allTugas: ListTugas;
  }

  let { allTugas }: Props = $props();

  const getTugasByDate = (date: DateValue) => {
    const stateOrder: TugasState[] = ["telat", "belum", "sudah"];
    const list = allTugas
      .filter((tugas) =>
        isSameDay(
          parseAbsoluteToLocal(tugas["batas-waktu"].toISOString()),
          date
        )
      )
      .map((tugas) => ({ ...tugas, state: $tasks.getTugasState(tugas) }))
      .sort(
        (a, b) => stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state)
      );

    if (list.length === 0) return false;

    let className: string;
    if (list.some(({ state }) => state === "telat")) className = "bg-red-200";
    else if (list.some(({ state }) => state === "belum"))
      className = "bg-orange-200";
    else className = "bg-indigo-200";

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
                    <BadgeTaskState state={data.state} />
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
