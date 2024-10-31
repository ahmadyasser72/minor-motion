<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { tasks } from "$lib/stores";
  import type { TugasId } from "$lib/types";

  import { Check, Undo2 } from "lucide-svelte";

  interface Props {
    class?: string | undefined;
    id: TugasId;
  }

  let { class: className = undefined, id }: Props = $props();
</script>

{#if $tasks.isDone(id)}
  <Button
    onclick={() => $tasks.undo(id)}
    class="uppercase bg-indigo-500 hover:bg-indigo-700 {className}"
  >
    <Undo2 class="mr-1 w-4 h-4" />
    undo
  </Button>
{:else}
  <Button
    onclick={() => $tasks.done(id)}
    class="uppercase bg-indigo-600 hover:bg-indigo-800 {className}"
  >
    <Check class="mr-1 w-4 h-4" />
    done
  </Button>
{/if}
