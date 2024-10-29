<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import type { TaskState } from "$lib/types";
  import { formatDate } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  import { ClockAlert, User, Users } from "lucide-svelte";
  import BadgeTaskState from "./badge-task-state.svelte";

  export let state: TaskState;
  export let data: Pick<
    CollectionEntry<"tugas">["data"],
    "tipe" | "batas-waktu"
  >;
</script>

<div
  class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
>
  <BadgeTaskState {state} />

  <Badge>
    {#if data.tipe === "individu"}
      <User class="w-4 h-4 mr-1" />
    {:else if data.tipe === "kelompok"}
      <Users class="w-4 h-4 mr-1" />
    {/if}

    {data.tipe}
  </Badge>

  <Badge>
    <ClockAlert class="w-4 h-4 mr-1" />
    {formatDate(data["batas-waktu"])}
  </Badge>
</div>
