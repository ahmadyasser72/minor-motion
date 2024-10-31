<script lang="ts">
  import ButtonDoneTask from "./button-done-task.svelte";

  import { Button } from "$lib/components/ui/button";
  import type { Tugas } from "$lib/types";

  import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-svelte";

  interface Props {
    data: Tugas;
  }

  let { data }: Props = $props();
</script>

<div class="grid sm:flex items-center sm:justify-between gap-2">
  <div class="grid sm:flex gap-2">
    <ButtonDoneTask class="sm:w-24" id={data.id} />

    {#if data["link-pengumpulan"] !== undefined}
      <Button href={data["link-pengumpulan"]} target="_blank" class="uppercase">
        link pengumpulan
        <SquareArrowOutUpRight class="ml-2 w-4 h-4" />
      </Button>
    {/if}
  </div>

  <Button onclick={() => history.back()} class="uppercase" variant="outline">
    kembali
    <CornerDownLeft class="ml-2 w-4 h-4" />
  </Button>
</div>
