<script lang="ts">
  import ButtonLogout from "./button-logout.svelte";

  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { googleUser } from "$lib/stores";

  import { User, UserX } from "lucide-svelte";
  import { onMount } from "svelte";

  let offline = $state(false);
  onMount(() => {
    const checkOnline = () => (offline = false);
    window.addEventListener("online", checkOnline);
    const checkOffline = () => (offline = true);
    window.addEventListener("offline", checkOffline);

    return () => {
      window.removeEventListener("online", checkOnline);
      window.removeEventListener("offline", checkOffline);
    };
  });
</script>

<Card.Root class="min-w-64">
  <Card.Header>
    <div class="flex flex-row items-center space-x-2">
      {#if !offline && $googleUser?.image !== undefined}
        <img
          src={$googleUser.image}
          alt="avatar"
          class="h-12 w-12 rounded-full border border-primary object-cover sm:h-16 sm:w-16"
        />
      {:else}
        {@const Icon = offline ? UserX : User}
        <div class="rounded-full border border-primary p-2">
          <Icon class="h-8 w-8 sm:h-12 sm:w-12" />
        </div>
      {/if}

      <span class="text-lg sm:text-2xl"
        >{offline ? "Offline" : ($googleUser?.name ?? "Anonim")}</span
      >
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
    <ButtonLogout />
  </Card.Footer>
</Card.Root>
