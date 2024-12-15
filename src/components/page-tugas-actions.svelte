<script lang="ts">
  import ButtonToggleStatusTugas from "./button-toggle-status-tugas.svelte";

  import { Button } from "$lib/components/ui/button";
  import type { Tugas } from "$lib/types";

  import { CornerDownLeft, SquareArrowOutUpRight } from "lucide-svelte";

  interface Props {
    data: Tugas;
  }

  let { data }: Props = $props();
</script>

<div class="grid items-center gap-2 sm:flex sm:justify-between">
  <div class="grid gap-2 sm:flex">
    <ButtonToggleStatusTugas class="sm:w-24" id={data.id} />

    {#if data["link-pengumpulan"] != undefined}
      <Button href={data["link-pengumpulan"]} target="_blank" class="uppercase">
        link pengumpulan
        <SquareArrowOutUpRight class="ml-2 h-4 w-4" />
      </Button>
    {/if}
  </div>

  <Button onclick={() => history.back()} class="uppercase" variant="outline">
    kembali
    <CornerDownLeft class="ml-2 h-4 w-4" />
  </Button>
</div>
