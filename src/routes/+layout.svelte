<script lang="ts">
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { onNavigate } from '$app/navigation';
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

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0e0c0e" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://vaishnavmanoj.com" />
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
  <div class="page-transition">
    {@render children()}
  </div>
{/if}

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-out {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
  }

  @keyframes slide-from-right {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slide-to-left {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-30px); }
  }

  :root::view-transition-old(root) {
    animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out,
               300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in,
               300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }

  :global(::view-transition-old(root)),
  :global(::view-transition-new(root)) {
    animation-duration: 300ms;
  }
</style>
