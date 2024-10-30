<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import type { Tugas, TugasState } from "$lib/types";
  import { formatDate } from "$lib/utils";

  import { ClockAlert, User, Users } from "lucide-svelte";
  import BadgeTaskState from "./badge-task-state.svelte";

  export let state: TugasState;
  export let data: Tugas;
</script>

<div
  class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
>
  <BadgeTaskState {state} />

  <Badge variant="secondary">
    {#if data.tipe === "individu"}
      <User class="w-4 h-4 mr-1" />
    {:else if data.tipe === "kelompok"}
      <Users class="w-4 h-4 mr-1" />
    {/if}

    {data.tipe}
  </Badge>

  <Badge variant="secondary">
    <ClockAlert class="w-4 h-4 mr-1" />
    {formatDate(data["batas-waktu"])}
  </Badge>
</div>
