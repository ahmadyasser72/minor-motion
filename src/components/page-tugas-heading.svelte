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
    class="scroll-m-20 pb-2 text-3xl text-center sm:text-start font-semibold tracking-tight transition-colors first:mt-0"
  >
    {data.judul}
  </h2>

  <div
    class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
  >
    <BadgeStatusTugas status={state} />

    <Badge>{data["mata-kuliah"].id}</Badge>

    <Badge variant="secondary">
      {#if data.tipe === "individu"}
        <User class="w-4 h-4 mr-1" />
      {:else if data.tipe === "kelompok"}
        <Users class="w-4 h-4 mr-1" />
      {/if}

      {data.tipe}
    </Badge>

    <Badge variant="secondary">
      <BookCheck class="w-4 h-4 mr-1" />
      pengumpulan : {data["tempat-pengumpulan"]}
    </Badge>

    <Badge variant="secondary">
      <ClockAlert class="w-4 h-4 mr-1" />
      batas-waktu : {formatDate(data["batas-waktu"])}
    </Badge>
  </div>
</div>
