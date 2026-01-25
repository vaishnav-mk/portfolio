<script lang="ts">
	import type { Portfolio } from '$lib/types';
	import ContactsBar from './ContactsBar.svelte';
	import { onMount } from 'svelte';

	interface Props {
		data: Portfolio;
	}

	let { data }: Props = $props();

	let animatedTitle = $state('');
	let animationDone = $state(false);

	type TitleParts = {
		before: string;
		highlight: string;
		after: string;
	};

	let titleParts = $state<TitleParts>({
		before: '',
		highlight: '',
		after: ''
	});

	function splitCloudflare(text: string): TitleParts {
		const needle = 'cloudflare';
		const lower = text.toLowerCase();
		const idx = lower.indexOf(needle);

		if (idx === -1) {
			return { before: text, highlight: '', after: '' };
		}

		return {
			before: text.slice(0, idx),
			highlight: text.slice(idx, idx + needle.length),
			after: text.slice(idx + needle.length)
		};
	}

	onMount(() => {
		const fullTitle = data.portfolio.title;
		const maskChar = '•';
		const scrambleChars = '!@#$%^&*()_+=-[]{};:,.<>/?';

		let revealed = 0;

		const buildFrame = () => {
			let result = '';
			for (let i = 0; i < fullTitle.length; i++) {
				const ch = fullTitle[i];
				if (ch === ' ') {
					result += ' ';
				} else if (i < revealed) {
					result += ch;
				} else {
					// show either a password-style mask or a scrambled char
					result += Math.random() < 0.4
						? maskChar
						: scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
				}
			}
			animatedTitle = result;
		};

		// start fully masked for an instant
		animatedTitle = fullTitle.replace(/[^ ]/g, maskChar);

		const interval = setInterval(() => {
			if (revealed >= fullTitle.length) {
				animatedTitle = fullTitle;
				titleParts = splitCloudflare(fullTitle);
				animationDone = true;
				clearInterval(interval);
				return;
			}
			revealed += 1;
			buildFrame();
		}, 45);

		return () => clearInterval(interval);
	});

	const allItems = [
		'Workers', 'Pages', 'R2', 'D1', 'KV', 'Durable Objects', 'Queues', 'Hyperdrive',
		'Vectorize', 'AI Gateway', 'Constellation', 'Cloudflare Stream', 'Images', 'Zaraz',
		'Turnstile', 'Access', 'Zero Trust', 'Magic Transit', 'Argo', 'Warp',
		'Payments', 'Checkout', 'Elements', 'Connect', 'Billing', 'Invoicing', 'Tax',
		'Radar', 'Sigma', 'Atlas', 'Identity', 'Terminal', 'Issuing', 'Treasury',
		'Payment Links', 'Financial Connections', 'Revenue Recognition',
		'Error Tracking', 'Performance', 'Profiling', 'Session Replay', 'Crons',
		'Releases', 'Alerts', 'Dashboards', 'Discover', 'Issues', 'Tracing',
		'Source Maps', 'Code Mappings', 'Integrations', 'SDK'
	];

	function shuffle<T>(array: T[]): T[] {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

const row1Items = shuffle(allItems);
const row2Items = shuffle(allItems);
const row3Items = shuffle(allItems);
const row4Items = shuffle(allItems);
const row5Items = shuffle(allItems);

	let highlightedIndices = $state<Set<number>>(new Set());

	onMount(() => {
		const interval = setInterval(() => {
			const newHighlights = new Set<number>();
			const numHighlights = Math.floor(Math.random() * 5) + 3;
			for (let i = 0; i < numHighlights; i++) {
				newHighlights.add(Math.floor(Math.random() * allItems.length * 6));
			}
			highlightedIndices = newHighlights;
		}, 600);

		return () => clearInterval(interval);
	});

	function isHighlighted(index: number, offset: number = 0): boolean {
		return highlightedIndices.has((index + offset) % (allItems.length * 6));
	}
</script>

<section class="border-b border-oc-border">
	<div class="px-6 py-12 md:py-16">
		<div class="inline-flex items-center gap-3 mb-6">
			<span class="px-2.5 py-1 bg-sunrise text-oc-bg text-xs font-medium tracking-wide">New</span>
			<span class="text-sm text-oc-text font-mono tracking-wide">
				{#if animationDone && titleParts.highlight}
					{titleParts.before}
					<span class="text-[#F38020]">{titleParts.highlight}</span>
					{titleParts.after}
				{:else}
					{animatedTitle || data.portfolio.title}
				{/if}
			</span>
		</div>
		
		<h1 class="text-3xl md:text-4xl lg:text-5xl font-medium mb-8 text-oc-text-bright leading-tight tracking-tight">
			{data.byline}
		</h1>
		
		<!-- Marquee with overlay -->
		<div class="relative w-full">
			<!-- Marquee background -->
			<div class="overflow-hidden py-6 px-16">
				<div class="marquee flex gap-6 text-sm font-mono whitespace-nowrap">
					{#each [...row1Items, ...row1Items] as item, i}
						<span
							class="transition-all duration-300 {isHighlighted(i, 0) ? 'text-sunrise opacity-100 scale-105' : 'text-oc-text-muted opacity-40'}"
						>{item}</span>
						<span class="text-oc-border opacity-30">·</span>
					{/each}
				</div>
				<div class="marquee-reverse flex gap-6 text-sm font-mono whitespace-nowrap mt-3">
					{#each [...row2Items, ...row2Items] as item, i}
						<span
							class="transition-all duration-300 {isHighlighted(i, 100) ? 'text-[#635bff] opacity-100 scale-105' : 'text-oc-text-muted opacity-40'}"
						>{item}</span>
						<span class="text-oc-border opacity-30">·</span>
					{/each}
				</div>
				<div class="marquee-slow flex gap-6 text-sm font-mono whitespace-nowrap mt-3">
					{#each [...row3Items, ...row3Items] as item, i}
						<span
							class="transition-all duration-300 {isHighlighted(i, 200) ? 'text-[#f04f88] opacity-100 scale-105' : 'text-oc-text-muted opacity-40'}"
						>{item}</span>
						<span class="text-oc-border opacity-30">·</span>
					{/each}
				</div>
				<div class="marquee-fast flex gap-6 text-sm font-mono whitespace-nowrap mt-3">
					{#each [...row4Items, ...row4Items] as item, i}
						<span
							class="transition-all duration-300 {isHighlighted(i, 300) ? 'text-[#00d4ff] opacity-100 scale-105' : 'text-oc-text-muted opacity-40'}"
						>{item}</span>
						<span class="text-oc-border opacity-30">·</span>
					{/each}
				</div>
				<div class="marquee-reverse-slow flex gap-6 text-sm font-mono whitespace-nowrap mt-3">
					{#each [...row5Items, ...row5Items] as item, i}
						<span
							class="transition-all duration-300 {isHighlighted(i, 400) ? 'text-[#ff9f1c] opacity-100 scale-105' : 'text-oc-text-muted opacity-40'}"
						>{item}</span>
						<span class="text-oc-border opacity-30">·</span>
					{/each}
				</div>
			</div>
			
			<!-- Center overlay -->
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div
					class="px-4 md:px-6 py-2 bg-oc-bg/95 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex justify-center"
				>
					<span class="font-mono text-sm md:text-base text-oc-text-bright whitespace-nowrap">
						<span class="text-oc-text-muted">$</span>
						<span class="text-sunrise">echo</span>
						<span class="text-oc-text">"I just love scaling and breaking things."</span>
					</span>
				</div>
			</div>
			
			<!-- Edge fades -->
			<div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-oc-bg to-transparent pointer-events-none"></div>
			<div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-oc-bg to-transparent pointer-events-none"></div>
		</div>
	</div>
	
	<ContactsBar email={data.portfolio.email} />
</section>

<style>
	.marquee {
		animation: marquee 45s linear infinite;
	}
	
	.marquee-fast {
		animation: marquee 30s linear infinite;
	}
	
	.marquee-reverse {
		animation: marquee-reverse 40s linear infinite;
	}
	
	.marquee-slow {
		animation: marquee 55s linear infinite;
	}
	
	.marquee-reverse-slow {
		animation: marquee-reverse 60s linear infinite;
	}
	
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	
	@keyframes marquee-reverse {
		0% { transform: translateX(-50%); }
		100% { transform: translateX(0); }
	}
</style>
