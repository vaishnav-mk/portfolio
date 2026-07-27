<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import data from '../portfolio.json';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import Seo from '$lib/components/Seo.svelte';

	let showSecret = $state(false);
	let decoded = $state('');
	let clickCount = $state(0);
	let idleShakeLevel = $state(1);
	let intercepting = $state(false);
	let displayedCode = $state('');
	let highlightedLines = $derived(displayedCode.split('\n').map(parseAssemblyLine));

	const MAX_RAGE = 22;

	let shakeHost = $state<HTMLDivElement | null>(null);
	let currentShake: Animation | null = null;

	let rage = $derived(Math.min(clickCount, MAX_RAGE));
	let rageRatio = $derived(rage / MAX_RAGE);
	let brightness = $derived(1 - rageRatio * 0.82);
	let contrast = $derived(1 + rageRatio * 0.35);

	function jitter(magnitude: number) {
		return (Math.random() * 2 - 1) * magnitude;
	}

	function shake() {
		if (!shakeHost) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const amp = 3 + rage * 2.4;
		const rot = 0.4 + rage * 0.34;
		const steps = Math.min(6 + Math.round(rage * 0.9), 20);
		const duration = Math.max(130, 460 - rage * 16);

		const rest = 'translate3d(0, 0, 0) rotate(0deg) scale(1) skewX(0deg)';
		const frames: Keyframe[] = [{ transform: rest }];

		for (let i = 1; i < steps; i++) {
			const decay = 1 - (i / steps) * 0.3;
			const scale = 1 + jitter(0.045 * rageRatio);
			const skew = jitter(1.6 * rageRatio);

			frames.push({
				transform:
					`translate3d(${jitter(amp) * decay}px, ${jitter(amp * 0.7) * decay}px, 0)` +
					` rotate(${jitter(rot) * decay}deg) scale(${scale}) skewX(${skew}deg)`
			});
		}

		frames.push({ transform: rest });

		shakeHost.style.transformOrigin = `${35 + Math.random() * 30}% ${35 + Math.random() * 30}%`;

		currentShake?.cancel();
		currentShake = shakeHost.animate(frames, {
			duration,
			easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)'
		});
	}

	onMount(() => {
		console.log('%c~vm', 'color: #ffa69e; font-size: 24px; font-weight: bold;');
		console.log('%cLost? Or just curious?', 'color: #a3a3a3; font-size: 14px;');
		console.log('%cHint: Some numbers are more than they appear...', 'color: #666666; font-size: 12px;');

		const idleInterval = setInterval(() => {
			if (!showSecret) idleShakeLevel = Math.min(idleShakeLevel + 1, 4);
		}, 3500);

		return () => clearInterval(idleInterval);
	});

	function handleClick() {
		clickCount++;
		shake();

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

	function parseAssemblyLine(line: string) {
		const commentStart = line.indexOf('#');
		const code = commentStart === -1 ? line : line.slice(0, commentStart);
		const comment = commentStart === -1 ? '' : line.slice(commentStart);
		const match = code.match(/^(\s*)([A-Z0-9.]+)?(\s+)?([A-Z0-9.]+)?(\s+)?(.*)$/);

		return {
			indent: match?.[1] ?? '',
			label: match?.[2] ?? '',
			labelGap: match?.[3] ?? '',
			opcode: match?.[4] ?? '',
			opcodeGap: match?.[5] ?? '',
			operand: match?.[6] ?? '',
			comment
		};
	}
</script>

<Seo
	title={`~/vm | ${$page.status}`}
	description="The page you're looking for doesn't exist."
	image="/og.svg?title=Lost%20Signal&description=This%20page%20does%20not%20exist"
	imageAlt="Lost signal error card"
	noindex={true}
/>

<style>
	.shake-host {
		transform-origin: center;
		transition: filter 260ms ease;
		will-change: transform, filter;
	}
	@keyframes idle-shake-1 {
		0%, 84%, 100% { transform: translateX(0) rotate(0deg); }
		86% { transform: translateX(-1px) rotate(-0.35deg); }
		88% { transform: translateX(1px) rotate(0.35deg); }
		90% { transform: translateX(-1px) rotate(-0.25deg); }
		92% { transform: translateX(1px) rotate(0.25deg); }
		94% { transform: translateX(0) rotate(0deg); }
	}
	@keyframes idle-shake-2 {
		0%, 80%, 100% { transform: translateX(0) rotate(0deg); }
		82% { transform: translateX(-2px) rotate(-0.6deg); }
		84% { transform: translateX(2px) rotate(0.6deg); }
		86% { transform: translateX(-2px) rotate(-0.45deg); }
		88% { transform: translateX(1px) rotate(0.35deg); }
		90% { transform: translateX(0) rotate(0deg); }
	}
	@keyframes idle-shake-3 {
		0%, 76%, 100% { transform: translateX(0) rotate(0deg); }
		78% { transform: translateX(-3px) rotate(-0.9deg); }
		80% { transform: translateX(3px) rotate(0.9deg); }
		82% { transform: translateX(-2px) rotate(-0.65deg); }
		84% { transform: translateX(2px) rotate(0.5deg); }
		86% { transform: translateX(0) rotate(0deg); }
	}
	@keyframes idle-shake-4 {
		0%, 72%, 100% { transform: translateX(0) rotate(0deg); }
		74% { transform: translateX(-4px) rotate(-1.1deg); }
		76% { transform: translateX(4px) rotate(1.1deg); }
		78% { transform: translateX(-3px) rotate(-0.85deg); }
		80% { transform: translateX(3px) rotate(0.7deg); }
		82% { transform: translateX(-1px) rotate(-0.35deg); }
		84% { transform: translateX(0) rotate(0deg); }
	}
	@keyframes signal-dot {
		0%, 70%, 100% { opacity: 0.55; transform: scale(1); }
		74% { opacity: 1; transform: translateX(-1px) scale(1.1); }
		78% { opacity: 0.75; transform: translateX(1px) scale(0.95); }
		82% { opacity: 1; transform: translateX(0) scale(1.08); }
	}
	:global(.idle-shake-1) { animation: idle-shake-1 2.6s ease-in-out infinite; transform-origin: center; }
	:global(.idle-shake-2) { animation: idle-shake-2 2.4s ease-in-out infinite; transform-origin: center; }
	:global(.idle-shake-3) { animation: idle-shake-3 2.2s ease-in-out infinite; transform-origin: center; }
	:global(.idle-shake-4) { animation: idle-shake-4 2s ease-in-out infinite; transform-origin: center; }
	.signal-dot { animation: signal-dot 2.4s ease-in-out infinite; }

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
	.cursor-blink::after {
		content: '|';
		animation: blink 0.8s infinite;
		color: var(--color-sunrise);
	}
	.asm-line {
		color: var(--color-oc-text);
	}
	.asm-label {
		color: var(--color-oc-text-bright);
	}
	.asm-opcode {
		color: var(--color-sunrise);
	}
	.asm-operand {
		color: #8fbfff;
	}
	.asm-comment {
		color: var(--color-oc-text-muted);
		font-style: italic;
	}

</style>

<section class="px-4 py-8 md:px-6 md:py-16 bg-oc-bg-alt border-b border-oc-border">
	<p class="text-sunrise mb-4">Error {$page.status}</p>
	<h1 class="text-xl md:text-2xl font-medium text-oc-text-bright mb-4">
		{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="text-oc-text leading-relaxed">
		{$page.error?.message || "The page you're looking for doesn't exist or has been moved."}
	</p>
</section>

<div class="px-4 py-6 md:px-6 md:py-12">
	<div class="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-start">
		<div>
			<div
				bind:this={shakeHost}
				class="shake-host mb-5 w-36 md:mb-8 md:w-56"
				style="filter: brightness({brightness}) contrast({contrast});"
			>
			<ActionButton
				variant="plain"
				ariaLabel="Reveal hidden error signal"
				onclick={handleClick}
				class="group relative min-h-0 w-full justify-center overflow-hidden border border-oc-border bg-oc-bg-alt px-4 py-4 text-5xl font-bold text-oc-text-muted shadow-[6px_6px_0_rgba(255,166,158,0.10)] transition-colors hover:border-sunrise/70 hover:bg-sunrise/10 hover:text-sunrise focus-visible:border-sunrise/70 focus-visible:bg-sunrise/10 focus-visible:text-sunrise md:px-6 md:py-6 md:text-8xl {showSecret ? '' : `idle-shake-${idleShakeLevel}`}"
			>
				<span aria-hidden="true" class="absolute left-2 top-2 h-3 w-3 border-l border-t border-sunrise/70 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"></span>
				<span aria-hidden="true" class="absolute right-2 top-2 h-3 w-3 border-r border-t border-sunrise/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></span>
				<span aria-hidden="true" class="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-sunrise/70 transition-transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5"></span>
				<span aria-hidden="true" class="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-sunrise/70 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>
				<span aria-hidden="true" class="signal-dot absolute right-4 top-4 h-2 w-2 bg-sunrise/70 opacity-60 transition-opacity group-hover:opacity-100"></span>
				{$page.status || 404}
			</ActionButton>
			</div>

			<nav class="mb-7 space-y-3 md:mb-10 md:space-y-4" aria-label="Error page navigation">
				{#each navItems as item}
					<SwipeLink 
						href={item.href} 
						variant="box"
						class="flex items-center gap-4 text-oc-text-bright group"
					>
						<span class="terminal-marker">[*]</span>
						<span class="w-8 h-px bg-oc-border group-hover:w-16 group-hover:bg-sunrise transition-all"></span>
						<span class="font-medium">{item.label}</span>
					</SwipeLink>
				{/each}
			</nav>

			<div class="min-h-6">
				{#if showSecret}
					<p class="text-oc-text-muted italic opacity-50" transition:fade={{ duration: 180 }}>
						psst... this site has other easter eggs too, if you're curious.
					</p>
				{/if}
			</div>
		</div>

		<div class="min-h-[25rem]" aria-hidden={!showSecret}>
			{#if showSecret}
			<div transition:fly={{ y: 10, duration: 220 }}>
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
					<pre class="max-h-56 overflow-x-auto overflow-y-auto p-5 leading-relaxed" class:cursor-blink={intercepting}>{#each highlightedLines as line}<span class="asm-line"><span>{line.indent}</span>{#if line.label}<span class="asm-label">{line.label}</span>{/if}<span>{line.labelGap}</span>{#if line.opcode}<span class="asm-opcode">{line.opcode}</span>{/if}<span>{line.opcodeGap}</span>{#if line.operand}<span class="asm-operand">{line.operand}</span>{/if}{#if line.comment}<span class="asm-comment">{line.comment}</span>{/if}</span>{'\n'}{/each}</pre>
				</div>

				<p class="text-oc-text-muted mb-6 leading-relaxed">
					Apollo Guidance Computer code — the software that landed humans on the Moon.
				</p>

				<p class="text-oc-text-bright leading-relaxed mb-5">
					Nicely done. Most people just hit the back button.<br/>
					<span class="text-oc-text-muted">I like the curious ones. Let's talk.</span>
				</p>

				<SwipeLink
					href={`mailto:${data.portfolio.email}?subject=Found your easter egg&body=Hey Vaishnav,%0A%0AI found your 404 easter egg...`}
					variant="inline"
					class="text-sunrise"
				>
					{data.portfolio.email}
				</SwipeLink>
			</div>
			{/if}
		</div>
	</div>
</div>
