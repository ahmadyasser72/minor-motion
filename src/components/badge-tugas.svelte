<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { tasks } from "$lib/stores";
  import type { TaskId } from "$lib/types";
  import { formatDate } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  import {
    BookCheck,
    Check,
    ClockAlert,
    TriangleAlert,
    User,
    Users,
  } from "lucide-svelte";

  export let id: TaskId;
  export let data: CollectionEntry<"tugas">["data"];
</script>

<div
  class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
>
  {#if $tasks.isDone(id)}
    <Badge class="bg-indigo-600 hover:bg-indigo-800 w-20">
      <Check class="w-4 h-4 mr-1" />
      done
    </Badge>
  {:else}
    <Badge class="bg-red-700 hover:bg-red-900 w-20">
      <TriangleAlert class="w-4 h-4 mr-1" />
      belum
    </Badge>
  {/if}

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
