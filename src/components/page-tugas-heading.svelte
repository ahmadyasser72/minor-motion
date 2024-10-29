<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { tasks } from "$lib/stores";
  import type { TugasId } from "$lib/types";
  import { formatDate } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  import { BookCheck, ClockAlert, User, Users } from "lucide-svelte";
  import BadgeTaskState from "./badge-task-state.svelte";

  export let id: TugasId;
  export let data: CollectionEntry<"tugas">["data"];

  $: state = $tasks.getTugasState(id, data);
</script>

<div
  class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
>
  <BadgeTaskState {state} />

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
    {data["tempat-pengumpulan"]}
  </Badge>

  <Badge variant="secondary">
    <ClockAlert class="w-4 h-4 mr-1" />
    {formatDate(data["batas-waktu"])}
  </Badge>
</div>
