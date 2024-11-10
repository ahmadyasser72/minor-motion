<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";

  import { User } from "lucide-svelte";
  import ButtonLogout from "./button-logout.svelte";

  interface Props {
    image: string | undefined;
    name: string;
  }

  let { image, name }: Props = $props();
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
    <ButtonLogout />
  </Card.Footer>
</Card.Root>
