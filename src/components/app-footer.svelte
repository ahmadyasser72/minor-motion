<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<footer class="flex items-center justify-end pt-4">
  <Button
    href="{import.meta.env._GITHUB_URL}/tree/{import.meta.env._GIT_HASH}"
    target="_blank"
    variant="outline"
  >
    source code ({import.meta.env._GIT_HASH})
  </Button>
</footer>
