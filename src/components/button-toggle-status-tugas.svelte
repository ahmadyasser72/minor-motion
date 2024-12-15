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
    class="bg-indigo-500 uppercase hover:bg-indigo-700 {className}"
  >
    <Undo2 class="mr-1 h-4 w-4" />
    undo
  </Button>
{:else}
  <Button
    onclick={() => $tasks.done(id)}
    class="bg-indigo-600 uppercase hover:bg-indigo-800 {className}"
  >
    <Check class="mr-1 h-4 w-4" />
    done
  </Button>
{/if}
