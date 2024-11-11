<script lang="ts">
  import CardProfile from "./card-profile.svelte";
  import GridButtonLogin from "./grid-button-login.svelte";

  import { state } from "$lib/stores";
</script>

{#if $state.login !== undefined}
  <CardProfile />
{:else}
  <p class="text-xl text-center mb-4">metode penyimpanan data</p>
  <GridButtonLogin />
{/if}
