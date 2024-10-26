<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";

  import { signOut } from "auth-astro/client";
  import { LogOut, User } from "lucide-svelte";

  export let image: string | undefined;
  export let name: string;
  export let login: "local" | "google" | undefined;

  const logOut = async () => {
    if (login === "google") await signOut();
    else if (login === "local") {
      document.cookie = `login=; expires=${new Date(0).toISOString()}`;
      document.location.reload();
    }
  };
</script>

<Card.Root class="min-w-64">
  <Card.Header>
    <div class="flex flex-row items-center space-x-2">
      {#if image !== undefined}
        <img
          src={image}
          alt="avatar"
          class="w-12 h-12 sm:w-16 sm:h-16 border border-primary rounded-full object-cover"
        />
      {:else}
        <div class="border border-primary rounded-full">
          <User class="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
      {/if}

      <span class="text-lg sm:text-2xl">{name}</span>
    </div>
  </Card.Header>

  <Card.Content>
    <div class="grid gap-2">
      <Button href="/jadwal">List Jadwal</Button>
    </div>
  </Card.Content>

  <Card.Footer class="justify-end">
    <Button on:click={logOut} variant="outline">
      <LogOut class="w-4 h-4 mr-2" />
      Logout
    </Button>
  </Card.Footer>
</Card.Root>
