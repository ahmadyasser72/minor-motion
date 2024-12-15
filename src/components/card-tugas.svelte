<script lang="ts">
  import BadgeStatusTugas from "./badge-status-tugas.svelte";
  import ButtonToggleStatusTugas from "./button-toggle-status-tugas.svelte";

  import { Badge } from "$lib/components/ui/badge";
  import * as Card from "$lib/components/ui/card";
  import { tasks } from "$lib/stores";
  import { StatusTugas, type Tugas } from "$lib/types";
  import { formatDate } from "$lib/utils.date";

  import { ClockAlert, User, Users } from "lucide-svelte";

  interface Props {
    data: Tugas;
    displaySubject: boolean;
  }

  let { data, displaySubject }: Props = $props();

  let status = $derived($tasks.getTugasState(data));
</script>

<Card.Root>
  <Card.Header>
    <Card.Title
      class="overflow-hidden text-ellipsis whitespace-nowrap hover:text-clip"
    >
      <a
        href="/tugas/{data.id}"
        class={status === StatusTugas.sudah
          ? "line-through"
          : "underline transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:text-card hover:no-underline"}
      >
        {data.judul}
      </a>
    </Card.Title>
  </Card.Header>

  <Card.Content>
    <div
      class="flex flex-wrap items-center justify-center gap-1 uppercase sm:justify-start"
    >
      <BadgeStatusTugas {status} />

      {#if displaySubject}
        <Badge>{data["mata-kuliah"].id}</Badge>
      {:else}
        <Badge variant="secondary">
          {#if data.tipe === "individu"}
            <User class="mr-1 h-4 w-4" />
          {:else if data.tipe === "kelompok"}
            <Users class="mr-1 h-4 w-4" />
          {/if}

          {data.tipe}
        </Badge>
      {/if}

      <Badge variant="secondary">
        <ClockAlert class="mr-1 h-4 w-4" />
        {formatDate(data["batas-waktu"])}
      </Badge>
    </div>
  </Card.Content>

  <Card.Footer>
    <div class="flex w-full justify-end space-x-1">
      <ButtonToggleStatusTugas class="flex-1" id={data.id} />
    </div>
  </Card.Footer>
</Card.Root>
