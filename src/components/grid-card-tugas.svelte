<script lang="ts">
  import CardTugas from "./card-tugas.svelte";

  import { tasks } from "$lib/stores";
  import type { Tugas } from "$lib/types";

  import { flip } from "svelte/animate";
  import { expoInOut } from "svelte/easing";

  interface Props {
    allTugas: Tugas[];
    displaySubject: boolean;
  }

  let { allTugas, displaySubject }: Props = $props();

  let sortedAllTugas = $derived(
    [...allTugas].sort(
      // sort tugas selesai keakhir
      (a, b) => Number($tasks.isDone(a.id)) - Number($tasks.isDone(b.id))
    )
  );
</script>

<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
  {#each sortedAllTugas as data (data.id)}
    <div animate:flip={{ duration: 500, easing: expoInOut }}>
      <CardTugas {data} {displaySubject} />
    </div>
  {/each}
</div>
