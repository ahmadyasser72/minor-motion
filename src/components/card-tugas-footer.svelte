<script lang="ts">
  import ButtonDoneTask from "./button-done-task.svelte";

  import type { TugasId } from "$lib/types";

  export let id: TugasId;
</script>

<div class="w-full flex justify-end space-x-1">
  <ButtonDoneTask class="flex-1" {id} />
</div>
