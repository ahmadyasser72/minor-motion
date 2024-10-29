<script lang="ts">
  import ButtonDoneTask from "./button-done-task.svelte";

  import { Button } from "$lib/components/ui/button";
  import type { TaskId } from "$lib/types";

  import { Info } from "lucide-svelte";

  export let id: TaskId;
</script>

<div class="w-full flex justify-end space-x-1">
  <ButtonDoneTask class="max-sm:flex-1 sm:w-24" {id} />

  <Button href="/tugas/{id}" class="flex-1 uppercase">
    <Info class="mr-1 w-4 h-4" />
    detail
  </Button>
</div>
