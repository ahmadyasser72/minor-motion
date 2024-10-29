<script lang="ts">
  import CardTugasContent from "./card-tugas-content.svelte";
  import CardTugasFooter from "./card-tugas-footer.svelte";

  import * as Card from "$lib/components/ui/card";
  import { tasks } from "$lib/stores";
  import type { TugasId } from "$lib/types";

  import type { CollectionEntry } from "astro:content";

  export let id: TugasId;
  export let data: CollectionEntry<"tugas">["data"];

  $: state = $tasks.getTugasState(id, data);
</script>

<Card.Root class="border-primary">
  <Card.Header>
    <Card.Title
      class="text-ellipsis whitespace-nowrap overflow-hidden
      {state === 'sudah' ? 'line-through' : 'underline'}"
    >
      <a href="/tugas/{id}">{data.judul}</a>
    </Card.Title>
  </Card.Header>

  <Card.Content>
    <CardTugasContent {state} {data} />
  </Card.Content>

  <Card.Footer>
    <CardTugasFooter {id} />
  </Card.Footer>
</Card.Root>
