<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { state } from "$lib/stores";

  import { signOut } from "auth-astro/client";
  import { LogOut } from "lucide-svelte";

  const logOut = async () => {
    if ($state.login === "google") await signOut();
    else {
      document.cookie = `login=; expires=${new Date(0).toISOString()}`;
      document.location.reload();
    }
  };
</script>

<Button onclick={logOut} variant="outline">
  <LogOut class="mr-2 h-4 w-4" />
  Logout
</Button>
