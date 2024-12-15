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

<div class="grid w-full max-w-sm gap-2">
  <Button onclick={loginGoogle} class="bg-indigo-600 hover:bg-indigo-800">
    <Google class="mr-2 h-4 w-4" />
    Google
  </Button>

  <Button onclick={loginLocal}>
    <Monitor class="mr-2 h-4 w-4" />
    Lokal
  </Button>
</div>
