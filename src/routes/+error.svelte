<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import data from '../data.json';

  let showSecret = $state(false);
  let decoded = $state('');
  let clickCount = $state(0);
  let shakeIntensity = $state(0);
  let intercepting = $state(false);
  let displayedCode = $state('');

  onMount(() => {
    console.log('%c~vm', 'color: #ffa69e; font-size: 24px; font-weight: bold;');
    console.log('%cLost? Or just curious?', 'color: #f0e6e6; font-size: 14px;');
    console.log('%cHint: Some numbers are more than they appear...', 'color: #f8f3f3; font-size: 12px; opacity: 0.7;');
  });

  function handleClick() {
    clickCount++;
    shakeIntensity = clickCount;
    setTimeout(() => shakeIntensity = 0, 500);

    if (clickCount >= 5 && !showSecret) {
      intercepting = true;
      console.log('%c// SIGNAL INTERCEPTED', 'color: #ffa69e; font-size: 16px; font-weight: bold;');
      console.log('%cAGC Code - Apollo Guidance Computer', 'color: #f0e6e6; font-size: 12px;');

      try {
        decoded = atob(data.easterEgg);
      } catch {
        decoded = '';
      }

      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < decoded.length) {
          displayedCode = decoded.slice(0, i + 1);
          i++;
        } else {
          clearInterval(typeInterval);
          intercepting = false;
        }
      }, 8);

      showSecret = true;
    } else if (clickCount === 3) {
      console.log('%cGetting warmer...', 'color: #ffa69e; font-size: 12px;');
    }
  }

  const navItems = [
    { href: '/', label: 'Home', index: '01' },
    { href: '/#experiences', label: 'Experiences', index: '02' },
    { href: '/#projects', label: 'Projects', index: '03' }
  ];
</script>

<svelte:head>
  <title>~vm | 404</title>
  <meta name="description" content="The page you're looking for doesn't exist. But hey, you might find something interesting here." />
  <meta property="og:title" content="404 - Page Not Found | Vaishnav Manoj" />
  <meta property="og:description" content="Lost? Or just curious? There might be something hidden here..." />
  <meta name="robots" content="noindex" />
  <style>
    @keyframes shake-1 {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-2px); }
      75% { transform: translateX(2px); }
    }
    @keyframes shake-2 {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px) rotate(-1deg); }
      75% { transform: translateX(4px) rotate(1deg); }
    }
    @keyframes shake-3 {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px) rotate(-2deg); }
      40% { transform: translateX(6px) rotate(2deg); }
      60% { transform: translateX(-6px) rotate(-2deg); }
      80% { transform: translateX(6px) rotate(2deg); }
    }
    @keyframes shake-4 {
      0%, 100% { transform: translateX(0); }
      10% { transform: translateX(-8px) rotate(-3deg); }
      30% { transform: translateX(8px) rotate(3deg); }
      50% { transform: translateX(-8px) rotate(-3deg); }
      70% { transform: translateX(8px) rotate(3deg); }
      90% { transform: translateX(-8px) rotate(-3deg); }
    }
    .shake-1 { animation: shake-1 0.4s ease-in-out !important; }
    .shake-2 { animation: shake-2 0.4s ease-in-out !important; }
    .shake-3 { animation: shake-3 0.5s ease-in-out !important; }
    .shake-4 { animation: shake-4 0.5s ease-in-out !important; }

    @keyframes subtle-float {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(1px, -1px); }
      50% { transform: translate(-1px, 1px); }
      75% { transform: translate(2px, 0); }
    }
    .subtle-float { animation: subtle-float 3s ease-in-out infinite; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .slide-in { animation: slideIn 0.4s ease-out forwards; }

    @keyframes unshade {
      from { opacity: 0; filter: blur(4px); }
      to { opacity: 0.4; filter: blur(0); }
    }
    .unshade { animation: unshade 0.8s ease-out forwards; }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .cursor-blink::after {
      content: '|';
      animation: blink 0.8s infinite;
      color: #ffa69e;
    }

    @keyframes glitch {
      0%, 100% { text-shadow: none; transform: translate(0); }
      20% { text-shadow: -2px 0 #ffa69e, 2px 0 #93c5fd; transform: translate(2px, -1px); }
      40% { text-shadow: 2px 0 #ffa69e, -2px 0 #93c5fd; transform: translate(-2px, 1px); }
      60% { text-shadow: -1px 0 #ffa69e, 1px 0 #93c5fd; transform: translate(1px, 0); }
      80% { text-shadow: 1px 0 #ffa69e, -1px 0 #93c5fd; transform: translate(-1px, -1px); }
    }
    .glitch-hover:hover { animation: glitch 0.3s ease-in-out infinite; }
    .glitch-hover::before,
    .glitch-hover::after {
      content: '404';
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
    }
    .glitch-hover:hover::before {
      opacity: 0.8;
      color: #ffa69e;
      animation: glitch 0.3s ease-in-out infinite reverse;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    }
    .glitch-hover:hover::after {
      opacity: 0.8;
      color: #93c5fd;
      animation: glitch 0.4s ease-in-out infinite;
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    }
  </style>
</svelte:head>

<div class="min-h-screen bg-night p-8 md:py-[88px] md:px-40">
  <div class="max-w-1440 mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-16">
    <div class="md:w-1/3 md:max-w-xs">
      <p class="text-sm text-sunrise mb-4">Error {$page.status}</p>

      <button
        onclick={handleClick}
        class="relative text-6xl md:text-8xl font-bold text-zenith mb-6 cursor-pointer select-none block glitch-hover subtle-float"
        class:shake-1={shakeIntensity === 1}
        class:shake-2={shakeIntensity === 2}
        class:shake-3={shakeIntensity === 3}
        class:shake-4={shakeIntensity >= 4}
      >
        404
      </button>

      <h1 class="text-xl md:text-2xl font-bold text-zenith opacity-50 mb-4">Page not found</h1>
      <p class="text-sm text-dawn opacity-70 leading-relaxed mb-12">The page you're looking for doesn't exist or has been moved.</p>

      <nav class="flex flex-col space-y-4">
        {#each navItems as item}
          <a href={item.href} class="flex items-center space-x-4 text-zenith hover:text-sunrise transition-colors duration-300 group">
            <span class="text-xs text-sunrise">.{item.index}</span>
            <span class="block w-12 h-px bg-zenith group-hover:w-24 transition-all duration-300"></span>
            <span class="text-sm uppercase font-bold">{item.label}</span>
          </a>
        {/each}
      </nav>

      {#if showSecret}
        <p class="text-xs text-dawn mt-8 italic unshade">psst... this site has other easter eggs too, if you're curious.</p>
      {/if}
    </div>

    {#if showSecret}
      <div class="md:w-2/5 slide-in">
        <p class="text-xs text-sunrise uppercase tracking-widest font-bold mb-8">
          {intercepting ? 'Intercepting...' : 'Signal Intercepted'}
        </p>

        <article class="bg-dusk rounded-lg overflow-hidden mb-8">
          <div class="flex items-center gap-2 px-4 py-3 bg-night/50 border-b border-zenith/10">
            <span class="w-2 h-2 rounded-full bg-sunrise/50"></span>
            <span class="w-2 h-2 rounded-full bg-zenith/30"></span>
            <span class="w-2 h-2 rounded-full bg-zenith/30"></span>
            <span class="text-xs text-dawn/50 ml-2 font-mono">agc_poodoo.s</span>
          </div>
          <pre class="text-xs text-dawn font-mono leading-relaxed p-6 overflow-x-auto max-h-64 overflow-y-auto" class:cursor-blink={intercepting}>{displayedCode}</pre>
        </article>

        <p class="text-sm text-dawn opacity-70 leading-relaxed mb-8">Apollo Guidance Computer code — the software that landed humans on the Moon.</p>

        <p class="text-sm text-zenith leading-relaxed mb-6">
          Nicely done. Most people just hit the back button.<br/>
          <span class="text-dawn/60">I like the curious ones. Let's talk.</span>
        </p>

        <a
          href={`mailto:${data.portfolio.email}?subject=Found your easter egg&body=Hey Vaishnav,%0A%0AI found your 404 easter egg...`}
          class="text-sm text-sunrise hover:text-zenith transition-colors duration-300 underline decoration-wavy underline-offset-4"
        >
          {data.portfolio.email}
        </a>
      </div>
    {/if}
  </div>
</div>
