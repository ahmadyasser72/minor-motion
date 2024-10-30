<script lang="ts">
  import CardTugasContent from "./card-tugas-content.svelte";
  import CardTugasFooter from "./card-tugas-footer.svelte";

  import * as Card from "$lib/components/ui/card";
  import { tasks } from "$lib/stores";
  import type { Tugas } from "$lib/types";

  export let data: Tugas;

  $: state = $tasks.getTugasState(data);
</script>

<Card.Root>
  <Card.Header>
    <Card.Title
      class="text-ellipsis hover:text-clip whitespace-nowrap overflow-hidden"
    >
      <a
        href="/tugas/{data.id}"
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
    <CardTugasFooter {data} />
  </Card.Footer>
</Card.Root>
