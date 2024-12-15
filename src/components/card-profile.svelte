<script lang="ts">
  import ButtonLogout from "./button-logout.svelte";

  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { googleUser } from "$lib/stores";

  import { User } from "lucide-svelte";
</script>

<Card.Root class="min-w-64">
  <Card.Header>
    <div class="flex flex-row items-center space-x-2">
      {#if $googleUser?.image !== undefined}
        <img
          src={$googleUser.image}
          alt="avatar"
          class="h-12 w-12 rounded-full border border-primary object-cover sm:h-16 sm:w-16"
        />
      {:else}
        <div class="rounded-full border border-primary">
          <User class="h-12 w-12 sm:h-16 sm:w-16" />
        </div>
      {/if}

      <span class="text-lg sm:text-2xl">{$googleUser?.name ?? "Anonim"}</span>
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
