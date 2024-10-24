<script lang="ts">
  import ButtonDoneTask from "./button-done-task.svelte";

  import { Button } from "$lib/components/ui/button";
  import type { TaskId } from "$lib/types";

  import type { CollectionEntry } from "astro:content";

  import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-svelte";

  export let id: TaskId;
  export let data: CollectionEntry<"tugas">["data"];
</script>

<div class="grid sm:flex items-center sm:justify-between gap-2">
  <div class="grid sm:flex gap-2">
    <ButtonDoneTask class="sm:w-24" {id} />

    {#if data["link-pengumpulan"] !== undefined}
      <Button href={data["link-pengumpulan"]} target="_blank" class="uppercase">
        link pengumpulan
        <SquareArrowOutUpRight class="ml-2 w-4 h-4" />
      </Button>
    {/if}
  </div>

  <Button on:click={() => history.back()} class="uppercase" variant="outline">
    kembali
    <CornerDownLeft class="ml-2 w-4 h-4" />
  </Button>
</div>
