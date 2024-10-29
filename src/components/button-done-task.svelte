<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { tasks } from "$lib/stores";
  import type { TaskId } from "$lib/types";

  import { Check, Undo2 } from "lucide-svelte";

  let className: string | undefined = undefined;
  export let id: TaskId;
  export { className as class };

  const { completed } = tasks;
</script>

{#if $completed.has(id)}
  <Button
    on:click={() => tasks.undo(id)}
    class="uppercase bg-indigo-500 hover:bg-indigo-700 {className}"
  >
    <Undo2 class="mr-1 w-4 h-4" />
    undo
  </Button>
{:else}
  <Button
    on:click={() => tasks.complete(id)}
    class="uppercase bg-indigo-600 hover:bg-indigo-800 {className}"
  >
    <Check class="mr-1 w-4 h-4" />
    done
  </Button>
{/if}
