<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { state } from "$lib/stores";

  import { signOut } from "auth-astro/client";
  import { LogOut, User } from "lucide-svelte";

  interface Props {
    image: string | undefined;
    name: string;
  }

  let { image, name }: Props = $props();

  const logOut = async () => {
    if ($state.login === "google") await signOut();
    else {
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
      <Button href="/calendar">Calendar Tugas</Button>
      <Button href="/jadwal">List Jadwal</Button>
      <Button href="/tugas">List Tugas</Button>
    </div>
  </Card.Content>

  <Card.Footer class="justify-end">
    <Button onclick={logOut} variant="outline">
      <LogOut class="w-4 h-4 mr-2" />
      Logout
    </Button>
  </Card.Footer>
</Card.Root>
