<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { formatDate } from "$lib/utils";

  import type { CollectionEntry } from "astro:content";

  import { BookCheck, ClockAlert, User, Users } from "lucide-svelte";

  export let data: CollectionEntry<"tugas">["data"];
</script>

<div
  class="uppercase flex flex-wrap items-center justify-center sm:justify-start gap-1"
>
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
