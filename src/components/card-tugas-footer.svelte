<script lang="ts">
  import ButtonDoneTask from "./button-done-task.svelte";

  import type { Tugas } from "$lib/types";

  interface Props {
    data: Tugas;
  }

  let { data }: Props = $props();
</script>

<div class="w-full flex justify-end space-x-1">
  <ButtonDoneTask class="flex-1" id={data.id} />
</div>
