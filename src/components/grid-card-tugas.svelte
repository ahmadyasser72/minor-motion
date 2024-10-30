<script lang="ts">
  import CardTugas from "./card-tugas.svelte";

  import { tasks } from "$lib/stores";
  import type { ListTugas } from "$lib/types";

  import { flip } from "svelte/animate";
  import { expoInOut } from "svelte/easing";

  export let allTugas: ListTugas;

  $: sortedAllTugas = [...allTugas].sort(
    // sort tugas selesai keakhir
    (a, b) => Number($tasks.isDone(a.id)) - Number($tasks.isDone(b.id))
  );
</script>

<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each sortedAllTugas as data (data.id)}
    <div animate:flip={{ duration: 500, easing: expoInOut }}>
      <CardTugas {data} />
    </div>
  {/each}
</div>
