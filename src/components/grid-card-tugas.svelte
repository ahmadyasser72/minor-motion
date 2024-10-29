<script lang="ts">
  import CardTugas from "./card-tugas.svelte";

  import { tasks } from "$lib/stores";

  import { type CollectionEntry } from "astro:content";

  import { flip } from "svelte/animate";
  import { expoInOut } from "svelte/easing";

  export let allTugas: CollectionEntry<"tugas">[];

  const { completed } = tasks;
  $: sortedAllTugas = [...allTugas].sort(
    // sort tugas selesai keakhir
    (a, b) => Number($completed.has(a.slug)) - Number($completed.has(b.slug))
  );
</script>

<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each sortedAllTugas as { slug, data } (slug)}
    <div animate:flip={{ duration: 500, easing: expoInOut }}>
      <CardTugas id={slug} {data} />
    </div>
  {/each}
</div>
