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
		console.log('%cLost? Or just curious?', 'color: #a3a3a3; font-size: 14px;');
		console.log('%cHint: Some numbers are more than they appear...', 'color: #666666; font-size: 12px;');
	});

	function handleClick() {
		clickCount++;
		shakeIntensity = clickCount;
		setTimeout(() => shakeIntensity = 0, 500);

		if (clickCount >= 5 && !showSecret) {
			intercepting = true;
			console.log('%c// SIGNAL INTERCEPTED', 'color: #ffa69e; font-size: 16px; font-weight: bold;');
			console.log('%cAGC Code - Apollo Guidance Computer', 'color: #a3a3a3; font-size: 12px;');

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
		{ href: '/', label: 'Home' },
		{ href: '/#experience', label: 'Experience' },
		{ href: '/#projects', label: 'Projects' }
	];
</script>

<svelte:head>
	<title>~/vm | {$page.status}</title>
	<meta name="description" content="The page you're looking for doesn't exist." />
	<meta name="robots" content="noindex" />
</svelte:head>

<style>
	@keyframes shake-1 {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-2px); }
		75% { transform: translateX(2px); }
	}
	@keyframes shake-2 {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-4px); }
		75% { transform: translateX(4px); }
	}
	@keyframes shake-3 {
		0%, 100% { transform: translateX(0); }
		20% { transform: translateX(-6px); }
		40% { transform: translateX(6px); }
		60% { transform: translateX(-6px); }
		80% { transform: translateX(6px); }
	}
	@keyframes shake-4 {
		0%, 100% { transform: translateX(0); }
		10% { transform: translateX(-8px); }
		30% { transform: translateX(8px); }
		50% { transform: translateX(-8px); }
		70% { transform: translateX(8px); }
		90% { transform: translateX(-8px); }
	}
	.shake-1 { animation: shake-1 0.4s ease-in-out; }
	.shake-2 { animation: shake-2 0.4s ease-in-out; }
	.shake-3 { animation: shake-3 0.5s ease-in-out; }
	.shake-4 { animation: shake-4 0.5s ease-in-out; }

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
	.cursor-blink::after {
		content: '|';
		animation: blink 0.8s infinite;
		color: #ffa69e;
	}

	@keyframes slideIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.slide-in { animation: slideIn 0.4s ease-out forwards; }

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 0.5; }
	}
	.fade-in { animation: fadeIn 0.8s ease-out forwards; }
</style>

<section class="px-6 py-12 md:py-16 bg-oc-bg-alt border-b border-oc-border">
	<p class="text-sunrise mb-4">Error {$page.status}</p>
	<h1 class="text-xl md:text-2xl font-medium text-oc-text-bright mb-4">
		{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="text-oc-text leading-relaxed">
		{$page.error?.message || "The page you're looking for doesn't exist or has been moved."}
	</p>
</section>

<div class="px-6 py-10 md:py-12">
	<div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12">
		<div class="lg:w-1/2">
			<button
				onclick={handleClick}
				class="relative text-6xl md:text-8xl font-bold text-oc-border mb-8 cursor-pointer select-none block hover:text-oc-text-muted transition-colors"
				class:shake-1={shakeIntensity === 1}
				class:shake-2={shakeIntensity === 2}
				class:shake-3={shakeIntensity === 3}
				class:shake-4={shakeIntensity >= 4}
			>
				{$page.status || 404}
			</button>

			<nav class="space-y-4 mb-10">
				{#each navItems as item}
					<a 
						href={item.href} 
						class="flex items-center gap-4 text-oc-text-bright hover:text-sunrise transition-colors group"
					>
						<span class="text-sunrise">[*]</span>
						<span class="w-8 h-px bg-oc-border group-hover:w-16 group-hover:bg-sunrise transition-all"></span>
						<span class="font-medium">{item.label}</span>
					</a>
				{/each}
			</nav>

			{#if showSecret}
				<p class="text-oc-text-muted italic fade-in">
					psst... this site has other easter eggs too, if you're curious.
				</p>
			{/if}
		</div>

		{#if showSecret}
			<div class="lg:w-1/2 slide-in">
				<p class="text-sunrise uppercase tracking-widest font-medium mb-6">
					{intercepting ? 'Intercepting...' : 'Signal Intercepted'}
				</p>

				<div class="border border-oc-border mb-6">
					<div class="flex items-center gap-2 px-4 py-3 border-b border-oc-border bg-oc-bg-alt">
						<span class="w-2 h-2 bg-sunrise"></span>
						<span class="w-2 h-2 bg-oc-border"></span>
						<span class="w-2 h-2 bg-oc-border"></span>
						<span class="text-oc-text-muted ml-2">agc_poodoo.s</span>
					</div>
					<pre class="text-oc-text leading-relaxed p-5 overflow-x-auto max-h-56 overflow-y-auto" class:cursor-blink={intercepting}>{displayedCode}</pre>
				</div>

				<p class="text-oc-text-muted mb-6 leading-relaxed">
					Apollo Guidance Computer code — the software that landed humans on the Moon.
				</p>

				<p class="text-oc-text-bright leading-relaxed mb-5">
					Nicely done. Most people just hit the back button.<br/>
					<span class="text-oc-text-muted">I like the curious ones. Let's talk.</span>
				</p>

				<a
					href={`mailto:${data.portfolio.email}?subject=Found your easter egg&body=Hey Vaishnav,%0A%0AI found your 404 easter egg...`}
					class="text-sunrise hover:underline transition-colors"
				>
					{data.portfolio.email}
				</a>
			</div>
		{/if}
	</div>
</div>
