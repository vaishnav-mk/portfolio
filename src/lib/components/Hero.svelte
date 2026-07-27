<script lang="ts">
	import type { Portfolio } from '$lib/types';
	import ContactsBar from './ContactsBar.svelte';
	import CloudflareErrorOverlay from './CloudflareErrorOverlay.svelte';
	import { onMount } from 'svelte';

	interface Props {
		data: Portfolio;
	}

	let { data }: Props = $props();

	function getCloudflareRange(text: string) {
		const needle = 'cloudflare';
		const lower = text.toLowerCase();
		const idx = lower.indexOf(needle);
		return idx === -1 ? null : { start: idx, end: idx + needle.length };
	}

	let title = $derived(data.portfolio.title);
	let cloudflareRange = $derived(getCloudflareRange(title));
	let displayedTitle = $state('');
	let visibleTitle = $derived(displayedTitle || title);

	function isCloudflareChar(index: number) {
		return Boolean(cloudflareRange && index >= cloudflareRange.start && index < cloudflareRange.end);
	}

	const REVEAL_SPEED_MS = 42;
	const ANIMATION_DELAY_MS = 120;

	let broken = $state(false);
	let breakHover = $state(false);

	const catTiles = Array.from({ length: 180 }, (_, index) => index);

	onMount(() => {
		let revealInterval: ReturnType<typeof setInterval> | undefined;
		const animationDelay = window.setTimeout(() => {
			const hashChars = '01#/._-$~';
			let frame = 0;

			function buildFrame() {
				displayedTitle = title
					.split('')
					.map((char, index) => {
						if (char === ' ' || char === '@') return char;
						if (index < frame) return char;
						return hashChars[(index + frame) % hashChars.length];
					})
					.join('');
			}

			buildFrame();
				revealInterval = setInterval(() => {
				frame += 1;
				if (frame >= title.length) {
					displayedTitle = title;
					clearInterval(revealInterval);
					return;
				}
				buildFrame();
			}, REVEAL_SPEED_MS);
		}, ANIMATION_DELAY_MS);

		return () => {
			clearTimeout(animationDelay);
			clearInterval(revealInterval);
		};
	});
</script>

<section class="hero-section relative border-b border-oc-border">
	<div class="hero-top relative">
		<div class="cloud-layer" aria-hidden="true">
			<img class="cloud-image" src="/cloud-alpha.png" alt="" loading="eager" decoding="async" />
		</div>

		<div class="relative z-10 px-4 py-9 md:px-6 md:py-16">
			<div class="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 md:mb-8">
				<span class="inline-flex items-center gap-2.5 pr-1 text-[11px] uppercase tracking-[0.28em] text-oc-text-muted">
					<span class="h-1 w-1 shrink-0 rounded-full bg-sunrise"></span>
					now
				</span>
				<span class="title-line text-sm tracking-wide text-oc-text-muted">
					{#each visibleTitle as char, index}
						<span class={isCloudflareChar(index) ? 'text-cloudflare' : ''}>{char}</span>
					{/each}
				</span>
			</div>

			<h1 class="max-w-5xl text-[1.75rem] font-normal leading-[1.32] tracking-[-0.015em] text-oc-text-bright md:text-[2.75rem] md:leading-[1.28] lg:text-[3.15rem]">
				{data.byline}
			</h1>

			<p class="mt-6 max-w-2xl text-sm leading-[1.85] text-oc-text-muted md:mt-8 md:text-base">
				{data.portfolio.description.split('.').slice(0, 1).join('.')}.
			</p>
		</div>

		<button
			type="button"
			class="break-veil"
			class:is-open={breakHover}
			tabindex="-1"
			aria-hidden="true"
			onpointerenter={() => breakHover = true}
			onpointerleave={() => breakHover = false}
			onclick={() => broken = true}
		>
			<span class="break-veil-tile" aria-hidden="true">
				{#if breakHover}
					{#each catTiles as tile (tile)}
						<img class="break-veil-tile-cat" src="/cat.webp" alt="" decoding="async" />
					{/each}
				{/if}
			</span>
			<span class="break-veil-inner">
				<img class="break-veil-cat" src="/yaycat.webp" alt="" aria-hidden="true" />
				<span class="break-veil-text">break???</span>
			</span>
		</button>

		<button
			type="button"
			class="break-toggle"
			aria-label="Break this page"
			title="break things"
			onpointerenter={() => breakHover = true}
			onpointerleave={() => breakHover = false}
			onfocus={() => breakHover = true}
			onblur={() => breakHover = false}
			onclick={() => broken = true}
		>
		</button>
	</div>

	<ContactsBar email={data.portfolio.email} socialLinks={data.socialLinks} resumeLink={data.resumeLink} />
</section>

{#if broken}
	<CloudflareErrorOverlay onClose={() => broken = false} />
{/if}

<style>
	.break-toggle {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 30;
		width: 0.7rem;
		height: 0.7rem;
		padding: 0;
		background: var(--color-sunrise);
		opacity: 0.5;
		transition: opacity 200ms ease, box-shadow 200ms ease;
	}

	.break-veil {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 20;
		display: grid;
		place-items: center;
		width: 0.7rem;
		height: 0.7rem;
		padding: 0;
		overflow: hidden;
		background: var(--color-sunrise);
		pointer-events: none;
		transition:
			width 240ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			height 260ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;
	}

	.break-veil.is-open {
		width: 100%;
		height: 100%;
		pointer-events: auto;
		transition:
			height 260ms cubic-bezier(0.16, 1, 0.3, 1) 0ms,
			width 340ms cubic-bezier(0.16, 1, 0.3, 1) 220ms;
	}

	.break-veil-tile {
		position: absolute;
		inset: -45%;
		z-index: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, 5rem);
		grid-auto-rows: 5rem;
		gap: 3rem;
		place-items: center;
		align-content: start;
		justify-content: center;
		transform: rotate(-24deg);
		filter: brightness(0);
		opacity: 0.26;
		pointer-events: none;
		overflow: hidden;
	}

	.break-veil-tile-cat {
		width: 2rem;
		height: auto;
		animation: cat-spin 9s linear infinite;
	}

	.break-veil-tile-cat:nth-child(2n) {
		animation-duration: 13s;
		animation-direction: reverse;
	}

	.break-veil-tile-cat:nth-child(3n) {
		animation-duration: 7s;
	}

	.break-veil-tile-cat:nth-child(5n) {
		animation-duration: 16s;
		animation-direction: reverse;
	}

	@keyframes cat-spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.break-veil-inner {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		gap: clamp(0.75rem, 2vw, 1.5rem);
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 140ms ease 0ms,
			transform 140ms ease 0ms;
	}

	.break-veil.is-open .break-veil-inner {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 220ms ease 500ms,
			transform 260ms cubic-bezier(0.16, 1, 0.3, 1) 500ms;
	}

	.break-veil-cat {
		width: clamp(3rem, 7vw, 4.75rem);
		height: clamp(3rem, 7vw, 4.75rem);
		object-fit: contain;
		flex-shrink: 0;
		display: block;
	}

	.break-veil-text {
		font-family: 'Comic Sans MS', 'Comic Sans', 'Chalkboard SE', 'Comic Neue', cursive;
		font-size: clamp(1.75rem, 6vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--color-oc-bg);
		display: block;
	}

	@media (prefers-reduced-motion: reduce) {
		.break-veil,
		.break-veil.is-open,
		.break-veil-inner,
		.break-veil.is-open .break-veil-inner {
			transition-duration: 1ms;
			transition-delay: 0ms;
		}

		.break-veil-tile-cat {
			animation: none;
		}
	}

	.break-toggle::after {
		content: '';
		position: absolute;
		inset: -0.75rem;
	}

	.break-toggle:hover,
	.break-toggle:focus-visible {
		opacity: 1;
		box-shadow: 0 0 14px rgba(255, 166, 158, 0.45);
	}

	@media (prefers-reduced-motion: reduce) {
		.break-toggle {
			transition: none;
		}
	}

	.hero-section {
		isolation: isolate;
	}

	.hero-top {
		overflow: clip;
	}

	.cloud-layer {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: clip;
	}

	.cloud-image {
		position: absolute;
		bottom: -14%;
		right: -6%;
		width: min(48rem, 62%);
		max-width: none;
		opacity: 0.11;
		filter: invert(1) brightness(0.82) contrast(1.08);
		mask-image:
			linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.4) 28%, black 62%),
			linear-gradient(180deg, transparent 4%, rgba(0, 0, 0, 0.55) 34%, black 72%);
		mask-composite: intersect;
		-webkit-mask-composite: source-in;
		animation: cloud-drift 18s ease-in-out infinite alternate;
		will-change: transform;
		user-select: none;
	}

	@media (max-width: 767px) {
		.cloud-image {
			bottom: -8%;
			right: -20%;
			width: 112%;
			opacity: 0.09;
		}
	}

	@keyframes cloud-drift {
		from {
			transform: translate3d(-46px, 6px, 0) scale(1);
		}

		to {
			transform: translate3d(46px, -6px, 0) scale(1.035);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cloud-image {
			animation: none;
		}
	}
</style>
