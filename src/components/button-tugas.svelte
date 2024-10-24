<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  import type { CollectionEntry } from "astro:content";

  import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-svelte";

  export let data: CollectionEntry<"tugas">["data"];
</script>

<div class="grid sm:flex items-center sm:justify-end gap-2">
  <Button href={data["link-pengumpulan"]} target="_blank" class="uppercase">
    link pengumpulan
    <SquareArrowOutUpRight class="ml-2 w-4 h-4" />
  </Button>

  <Button on:click={() => history.back()} class="uppercase" variant="outline">
    kembali
    <CornerDownLeft class="ml-2 w-4 h-4" />
  </Button>
</div>
