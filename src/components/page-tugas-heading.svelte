<script lang="ts">
  import BadgeStatusTugas from "./badge-status-tugas.svelte";

  import { Badge } from "$lib/components/ui/badge";
  import { tasks } from "$lib/stores";
  import type { Tugas } from "$lib/types";
  import { formatDate } from "$lib/utils.date";

  import { BookCheck, ClockAlert, User, Users } from "lucide-svelte";

  interface Props {
    data: Tugas;
  }

  let { data }: Props = $props();

  let state = $derived($tasks.getTugasState(data));
</script>

<div>
  <h2
    class="scroll-m-20 pb-2 text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0 sm:text-start"
  >
    {data.judul}
  </h2>

  <div
    class="flex flex-wrap items-center justify-center gap-1 uppercase sm:justify-start"
  >
    <BadgeStatusTugas status={state} />

    <Badge>{data["mata-kuliah"].id}</Badge>

    <Badge variant="secondary">
      {#if data.tipe === "individu"}
        <User class="mr-1 h-4 w-4" />
      {:else if data.tipe === "kelompok"}
        <Users class="mr-1 h-4 w-4" />
      {/if}

      {data.tipe}
    </Badge>

    <Badge variant="secondary">
      <BookCheck class="mr-1 h-4 w-4" />
      pengumpulan : {data["tempat-pengumpulan"]}
    </Badge>

    <Badge variant="secondary">
      <ClockAlert class="mr-1 h-4 w-4" />
      {formatDate(data["batas-waktu"])}
    </Badge>
  </div>
</div>
