<script lang="ts">
  import BadgeStatusTugas from "./badge-status-tugas.svelte";
  import ButtonToggleStatusTugas from "./button-toggle-status-tugas.svelte";

  import { Badge } from "$lib/components/ui/badge";
  import * as Card from "$lib/components/ui/card";
  import { tasks } from "$lib/stores";
  import { StatusTugas, type Tugas } from "$lib/types";
  import { formatDate } from "$lib/utils";

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
      class="text-ellipsis hover:text-clip whitespace-nowrap overflow-hidden"
    >
      <a
        href="/tugas/{data.id}"
        class={status === StatusTugas.sudah
          ? "line-through"
          : "transition-colors duration-300 ease-in-out hover:text-card underline hover:no-underline hover:bg-indigo-600"}
      >
        {data.judul}
      </a>
    </Card.Title>
  </Card.Header>

  <Card.Content>
    <div
      class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
    >
      <BadgeStatusTugas {status} />

      {#if displaySubject}
        <Badge>{data["mata-kuliah"].id}</Badge>
      {:else}
        <Badge variant="secondary">
          {#if data.tipe === "individu"}
            <User class="w-4 h-4 mr-1" />
          {:else if data.tipe === "kelompok"}
            <Users class="w-4 h-4 mr-1" />
          {/if}

          {data.tipe}
        </Badge>
      {/if}

      <Badge variant="secondary">
        <ClockAlert class="w-4 h-4 mr-1" />
        {formatDate(data["batas-waktu"])}
      </Badge>
    </div>
  </Card.Content>

  <Card.Footer>
    <div class="w-full flex justify-end space-x-1">
      <ButtonToggleStatusTugas class="flex-1" id={data.id} />
    </div>
  </Card.Footer>
</Card.Root>
