<script lang="ts">
  import Greeting from '$lib/components/Greeting.svelte';
  import '../app.css';
  import { onMount } from 'svelte';
  import favicon from '$lib/assets/dexter.png';

  let { children } = $props();

  let showLoading = $state(true);

  onMount(() => {
    const timer = setTimeout(() => {
      showLoading = false;
    }, 1200);

    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="loading-screen" class:hidden={!showLoading}>
  <Greeting />
</div>

<div class="main-content" class:hidden={showLoading}>
  {@render children()}
</div>
