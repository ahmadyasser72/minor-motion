<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";

  import { CircleAlert, Info } from "lucide-svelte";
</script>

<div class="flex justify-end space-x-2">
  <Badge class="uppercase bg-indigo-600 hover:bg-indigo-800">
    <Info class="w-4 h-4 mr-1" />
    tugas
  </Badge>
  <Badge class="uppercase bg-red-600 hover:bg-red-800">
    <CircleAlert class="mr-1 w-4 h-4" />
    tugas (terlewat)
  </Badge>
</div>
