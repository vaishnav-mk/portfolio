<script lang="ts">
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import Greeting from '$lib/components/Greeting.svelte';
  import '../app.css';
  import { onMount } from 'svelte';
  import favicon from '$lib/assets/dexter.png';

  injectAnalytics();

  let { children } = $props();
  let showLoading = $state(true);
  let fadeOut = $state(false);

  onMount(() => {
    const timer = setTimeout(() => {
      fadeOut = true;
      setTimeout(() => {
        showLoading = false;
      }, 400);
    }, 1400);

    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if showLoading}
  <div
    class="fixed inset-0 z-[9999] bg-night transition-opacity duration-400"
    class:opacity-0={fadeOut}
    class:pointer-events-none={fadeOut}
  >
    <Greeting />
  </div>
{/if}

{#if !showLoading}
  {@render children()}
{/if}
