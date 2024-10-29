<script lang="ts">
  import Google from "$lib/components/icons/google.svelte";

  import { Button } from "$lib/components/ui/button";

  import { signIn } from "auth-astro/client";
  import { Monitor } from "lucide-svelte";

  const loginGoogle = () => signIn("google");
  const loginLocal = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 5);
    document.cookie = `login=local; expires=${expires.toUTCString()}`;
    window.location.reload();
  };
</script>

<div class="grid gap-2 w-full max-w-sm">
  <Button
    on:click={loginGoogle}
    class="bg-indigo-600 hover:bg-indigo-800 flex-1"
  >
    <Google class="w-4 h-4 mr-2" />
    Google
  </Button>

  <Button on:click={loginLocal}>
    <Monitor class="w-4 h-4 mr-2" />
    Lokal
  </Button>
</div>
