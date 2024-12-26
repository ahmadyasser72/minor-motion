<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<footer class="flex items-center justify-end pt-4">
  <Button
    href={import.meta.env._GITHUB_URL}
    target="_blank"
    variant="outline"
  >
    source code
  </Button>
</footer>
