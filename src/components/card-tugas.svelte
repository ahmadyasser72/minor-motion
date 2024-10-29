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

<Card.Root>
  <Card.Header>
    <Card.Title
      class="text-ellipsis hover:text-clip whitespace-nowrap overflow-hidden"
    >
      <a
        href="/tugas/{id}"
        class={state === "sudah"
          ? "line-through"
          : "transition-colors duration-300 ease-in-out hover:text-card underline hover:no-underline hover:bg-indigo-600"}
      >
        {data.judul}
      </a>
    </Card.Title>
  </Card.Header>

  <Card.Content>
    <CardTugasContent {state} {data} />
  </Card.Content>

  <Card.Footer>
    <CardTugasFooter {id} />
  </Card.Footer>
</Card.Root>
