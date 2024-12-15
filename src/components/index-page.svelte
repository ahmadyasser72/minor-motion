<script lang="ts">
  import CardProfile from "./card-profile.svelte";
  import GridButtonLogin from "./grid-button-login.svelte";

  import { state } from "$lib/stores";
</script>

{#if $state.login !== undefined}
  <CardProfile />
{:else}
  <p class="mb-4 text-center text-xl">metode penyimpanan data</p>
  <GridButtonLogin />
{/if}
