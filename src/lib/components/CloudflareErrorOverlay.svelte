<script lang="ts">
	import { onMount } from 'svelte';
	import { formatUtc } from '$lib/utils/date';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	let coloLocation = $state('Local');
	let hostName = $state('origin');
	let rayId = $state('');
	let timestamp = $state('');
	let phase = $state<'glitch' | 'hold' | 'cut' | 'done' | 'reverse'>('glitch');
	let canvas: HTMLCanvasElement;
	let cloudflareInfoUrl = $derived(
		`https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_500&utm_campaign=${hostName}`
	);

	type CloudflareRequestMeta = {
		colo?: string;
		city?: string;
	};

	async function getCloudflareLocation() {
		try {
			const response = await fetch('https://workers.cloudflare.com/cf.json', { cache: 'no-store' });
			if (response.ok) {
				const meta = await response.json() as CloudflareRequestMeta;
				if (meta.city) return meta.city === 'Bengaluru' ? 'Bangalore' : meta.city;
				if (meta.colo) return meta.colo;
			}
		} catch {
			// Fall through to local trace endpoint.
		}

		try {
			const response = await fetch('/cdn-cgi/trace', { cache: 'no-store' });
			if (!response.ok) return 'Bangalore';

			const trace = await response.text();
			const colo = trace.match(/^colo=(.+)$/m)?.[1]?.trim().toUpperCase();
			return colo === 'BLR' ? 'Bangalore' : (colo ?? 'Bangalore');
		} catch {
			return 'Bangalore';
		}
	}

	function createRayId() {
		const b = new Uint8Array(8);
		crypto.getRandomValues(b);
		return Array.from(b, (v) => v.toString(16).padStart(2, '0')).join('');
	}

	function runGlitch(reverse = false) {
		if (!canvas) return;
		const rawContext = canvas.getContext('2d');
		if (!rawContext) return;
		const ctx: CanvasRenderingContext2D = rawContext;

		const w = canvas.width = window.innerWidth;
		const h = canvas.height = window.innerHeight;
		const duration = reverse ? 800 : 1200;
		const start = performance.now();
		let raf: number;

		function frame(now: number) {
			const elapsed = now - start;
			const t = Math.min(elapsed / duration, 1);
			const intensity = reverse ? 1 - t : t;

			ctx.clearRect(0, 0, w, h);

			// Layer 1: horizontal RGB-split tears
			const tearCount = Math.floor(3 + intensity * 18);
			for (let i = 0; i < tearCount; i++) {
				const y = Math.random() * h;
				const tearH = 1 + Math.random() * (4 + intensity * 28);
				const shift = (Math.random() - 0.5) * intensity * 80;

				ctx.globalCompositeOperation = 'source-over';
				// Dark strip
				ctx.fillStyle = `rgba(13,13,13,${0.3 + intensity * 0.6})`;
				ctx.fillRect(0, y, w, tearH);

				// RGB channels offset
				ctx.globalCompositeOperation = 'lighter';
				ctx.fillStyle = `rgba(255,60,60,${0.08 + intensity * 0.18})`;
				ctx.fillRect(shift, y, w, tearH * 0.6);
				ctx.fillStyle = `rgba(60,255,120,${0.05 + intensity * 0.12})`;
				ctx.fillRect(-shift * 0.7, y + tearH * 0.2, w, tearH * 0.5);
				ctx.fillStyle = `rgba(80,80,255,${0.05 + intensity * 0.14})`;
				ctx.fillRect(shift * 0.4, y + tearH * 0.4, w, tearH * 0.4);
			}

			ctx.globalCompositeOperation = 'source-over';

			// Layer 2: blocky artifacts
			const blockCount = Math.floor(intensity * 30);
			for (let i = 0; i < blockCount; i++) {
				const bx = Math.random() * w;
				const by = Math.random() * h;
				const bw = 8 + Math.random() * (40 + intensity * 60);
				const bh = 2 + Math.random() * (6 + intensity * 14);
				const colors = ['rgba(255,166,158,', 'rgba(243,128,32,', 'rgba(13,13,13,', 'rgba(255,255,255,'];
				ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] + (0.1 + intensity * 0.5) + ')';
				ctx.fillRect(bx, by, bw, bh);
			}

			// Layer 3: scan line noise at high intensity
			if (intensity > 0.5) {
				const noiseIntensity = (intensity - 0.5) * 2;
				for (let y = 0; y < h; y += 2) {
					if (Math.random() < noiseIntensity * 0.3) {
						ctx.fillStyle = `rgba(255,255,255,${Math.random() * noiseIntensity * 0.15})`;
						ctx.fillRect(0, y, w, 1);
					}
				}
			}

			// Layer 4: large displacement blocks at peak
			if (intensity > 0.7) {
				const bigCount = Math.floor((intensity - 0.7) * 12);
				for (let i = 0; i < bigCount; i++) {
					const by = Math.random() * h;
					const bh = 10 + Math.random() * 50;
					const shift = (Math.random() - 0.5) * intensity * 120;
					ctx.fillStyle = `rgba(13,13,13,${0.6 + Math.random() * 0.3})`;
					ctx.fillRect(shift > 0 ? 0 : w + shift, by, Math.abs(shift), bh);
				}
			}

			// Full white flash near end (forward only)
			if (!reverse && t > 0.88) {
				const flashAlpha = (t - 0.88) / 0.12;
				ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
				ctx.fillRect(0, 0, w, h);
			}

			// Fade to white at very end (forward)
			if (!reverse && t > 0.95) {
				ctx.fillStyle = `rgba(255,255,255,${(t - 0.95) / 0.05})`;
				ctx.fillRect(0, 0, w, h);
			}

			if (t < 1) {
				raf = requestAnimationFrame(frame);
			}
		}

		raf = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(raf);
	}

	let reverseCleanup: (() => void) | undefined;
	let cancelIntroGlitch: (() => void) | undefined;
	let introTimers: ReturnType<typeof setTimeout>[] = [];

	function clearIntroAnimation() {
		cancelIntroGlitch?.();
		cancelIntroGlitch = undefined;
		introTimers.forEach(clearTimeout);
		introTimers = [];
	}

	onMount(() => {
		getCloudflareLocation().then((location) => {
			coloLocation = location;
		});
		hostName = window.location.hostname || 'origin';
		rayId = createRayId();
		timestamp = formatUtc(new Date());

		const prevHtml = document.documentElement.style.overflow;
		const prevBody = document.body.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.addEventListener('keydown', handleKeydown);

		if (prefersReducedMotion) {
			phase = 'done';
		} else {
			cancelIntroGlitch = runGlitch(false);
			introTimers = [
				setTimeout(() => { phase = 'hold'; }, 1200),
				setTimeout(() => { phase = 'cut'; }, 1350),
				setTimeout(() => { phase = 'done'; }, 1900)
			];
		}

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			clearIntroAnimation();
			reverseCleanup?.();
			document.documentElement.style.overflow = prevHtml;
			document.body.style.overflow = prevBody;
		};
	});

	function reverseGlitch() {
		if (phase === 'reverse') return;
		clearIntroAnimation();
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			onClose();
			return;
		}
		phase = 'reverse';
		const cancelAnim = runGlitch(true);
		const timer = setTimeout(onClose, 900);
		reverseCleanup = () => { cancelAnim?.(); clearTimeout(timer); };
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') reverseGlitch();
	}
</script>

<div class="fixed inset-0 z-[100] overflow-auto bg-white" role="dialog" aria-modal="true" aria-label="Simulated Cloudflare 500 error page">
	<!-- Glitch canvas layer -->
	<canvas
		bind:this={canvas}
		class="pointer-events-none absolute inset-0 z-30 h-full w-full"
		class:opacity-0={phase === 'done'}
		class:glitch-fade={phase === 'cut'}
		aria-hidden="true"
	></canvas>

	<!-- White flash between glitch and CF page -->
	{#if phase === 'hold'}
		<div class="absolute inset-0 z-20 bg-white" aria-hidden="true"></div>
	{/if}

	<!-- CF error page -->
	<div
		class="cf-page relative z-10 bg-white font-sans tracking-normal text-[#404040]"
		class:cf-visible={phase === 'cut' || phase === 'done'}
		class:cf-hide={phase === 'reverse'}
	>
		<header class="mx-auto mb-8 w-[960px] pt-10 max-[1024px]:w-full max-[1024px]:px-8 max-[767px]:px-6 max-[767px]:pt-6">
			<h1 class="mr-2 inline-block text-[60px] font-light leading-[1.15] text-[#3d3d3d] max-[767px]:mb-2 max-[767px]:block max-[767px]:text-4xl">
				<span class="inline-block">Internal server error</span>
				<span class="ml-3 inline-block rounded-full bg-[#dedede] px-3 py-1 align-middle text-[15px] font-semibold leading-none text-[#333] max-[767px]:ml-0 max-[767px]:text-[13px]">Error code 500</span>
			</h1>
			<div class="text-[15px] leading-[1.5] text-[#333] max-[767px]:text-[14px]">
				Visit <a class="cf-link" href={cloudflareInfoUrl} target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
			</div>
			<div class="mt-3 text-[15px] leading-[1.5] text-[#333] max-[767px]:text-[14px]">{timestamp}</div>
		</header>

		<section class="relative my-8 bg-[#f0f0f0] shadow-[inset_0_8px_20px_rgba(0,0,0,0.08),inset_0_-8px_16px_rgba(0,0,0,0.06)]" aria-label="Connection status">
			<div class="mx-auto flex w-[960px] max-[1024px]:w-full max-[767px]:block max-[767px]:px-8">
				<div class="relative w-1/3 overflow-hidden py-[60px] text-center max-[767px]:w-full max-[767px]:border-b max-[767px]:border-[#c6c6c6] max-[767px]:py-8 max-[767px]:text-left">
					<div class="relative mx-auto mb-10 h-20 w-[120px] max-[767px]:m-0 max-[767px]:h-0 max-[767px]:w-full">
						<svg class="mx-auto block h-20 w-[120px] max-[767px]:hidden" viewBox="0 0 170 120" aria-hidden="true">
							<rect x="28" y="20" width="114" height="90" rx="10" fill="#9b9b9b" />
							<rect x="42" y="48" width="86" height="52" fill="#efefef" />
							<circle cx="43" cy="35" r="5" fill="#f3f3f3" />
							<circle cx="56" cy="35" r="5" fill="#f3f3f3" />
							<rect x="68" y="31" width="62" height="8" fill="#efefef" />
						</svg>
						<span class="absolute -bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#a6ce39] text-[34px] font-light leading-none text-white max-[767px]:right-0 max-[767px]:top-0 max-[767px]:left-auto max-[767px]:bottom-auto max-[767px]:translate-x-0">&#10003;</span>
					</div>
					<span class="block w-full truncate text-[15px] leading-[1.3] text-[#333] max-[767px]:block">You</span>
					<h3 class="mt-3 text-[24px] font-light leading-[1.3] text-[#999] max-[767px]:mt-0 max-[767px]:inline-block">Browser</h3>
					<span class="block text-[24px] font-light leading-[1.3] text-[#9bc943] max-[767px]:inline-block max-[767px]:ml-1">Working</span>
				</div>

				<div class="relative w-1/3 overflow-hidden py-[60px] text-center max-[767px]:w-full max-[767px]:border-b max-[767px]:border-[#c6c6c6] max-[767px]:py-8 max-[767px]:text-left">
					<div class="relative mx-auto mb-10 h-20 w-[130px] max-[767px]:m-0 max-[767px]:h-0 max-[767px]:w-full">
						<svg class="mx-auto block h-20 w-[130px] max-[767px]:hidden" viewBox="0 0 200 120" aria-hidden="true">
							<path d="M43 101h116c17 0 31-14 31-31s-14-31-31-31c-4 0-8 1-12 2C139 19 118 4 94 4 67 4 44 24 39 50c-3-1-7-2-11-2C12 48 0 61 0 77s13 24 43 24z" transform="translate(7 18)" fill="#9b9b9b" />
						</svg>
						<span class="absolute -bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#c8322b] text-[30px] font-light leading-none text-white max-[767px]:right-0 max-[767px]:top-0 max-[767px]:left-auto max-[767px]:bottom-auto max-[767px]:translate-x-0">&times;</span>
					</div>
					<span class="block w-full truncate text-[15px] leading-[1.3] text-[#333] max-[767px]:block">{coloLocation}</span>
					<h3 class="mt-3 text-[24px] font-light leading-[1.3] text-[#3f7fc1] max-[767px]:mt-0 max-[767px]:inline-block">Cloudflare</h3>
					<span class="block text-[24px] font-light leading-[1.3] text-[#b9342d] max-[767px]:inline-block max-[767px]:ml-1">Error</span>
				</div>

				<div class="relative w-1/3 overflow-hidden py-[60px] text-center max-[767px]:w-full max-[767px]:border-b max-[767px]:border-[#c6c6c6] max-[767px]:py-8 max-[767px]:text-left">
					<div class="relative mx-auto mb-10 h-20 w-[120px] max-[767px]:m-0 max-[767px]:h-0 max-[767px]:w-full">
						<svg class="mx-auto block h-20 w-[120px] max-[767px]:hidden" viewBox="0 0 170 120" aria-hidden="true">
							<path d="M45 28h80c6 0 11 4 13 10l18 52v37c0 8-6 14-14 14H28c-8 0-14-6-14-14V90l18-52c2-6 7-10 13-10z" transform="translate(0 -8)" fill="#9b9b9b" />
							<rect x="34" y="70" width="102" height="36" rx="3" fill="#f0f0f0" />
							<circle cx="124" cy="88" r="7" fill="#9b9b9b" />
						</svg>
						<span class="absolute -bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#a6ce39] text-[34px] font-light leading-none text-white max-[767px]:right-0 max-[767px]:top-0 max-[767px]:left-auto max-[767px]:bottom-auto max-[767px]:translate-x-0">&#10003;</span>
					</div>
					<span class="block w-full truncate text-[15px] leading-[1.3] text-[#333] max-[767px]:block">{hostName}</span>
					<h3 class="mt-3 text-[24px] font-light leading-[1.3] text-[#999] max-[767px]:mt-0 max-[767px]:inline-block">Host</h3>
					<span class="block text-[24px] font-light leading-[1.3] text-[#9bc943] max-[767px]:inline-block max-[767px]:ml-1">Working</span>
				</div>
			</div>
			<div class="absolute bottom-[-1px] left-1/2 h-[38px] w-[38px] -translate-x-1/2 translate-y-1/2 rotate-45 bg-white max-[767px]:hidden" aria-hidden="true"></div>
		</section>

		<main class="mx-auto mb-8 grid w-[960px] grid-cols-2 gap-16 py-8 max-[1024px]:w-full max-[1024px]:px-8 max-[767px]:grid-cols-1 max-[767px]:gap-8 max-[767px]:px-6">
			<section>
				<h2 class="mb-4 text-[30px] font-normal leading-[1.3] text-[#3d3d3d] max-[900px]:text-[22px]">What happened?</h2>
				<p class="text-[15px] leading-[1.5] text-[#3d3d3d] max-[900px]:text-[14px]">There is an internal server error on Cloudflare's network.</p>
			</section>
			<section>
				<h2 class="mb-4 text-[30px] font-normal leading-[1.3] text-[#3d3d3d] max-[900px]:text-[22px]">What can I do?</h2>
				<p class="text-[15px] leading-[1.5] text-[#3d3d3d] max-[900px]:text-[14px]">Please try again in a few minutes.</p>
			</section>
		</main>

		<footer class="mx-auto flex w-[960px] flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-[#d8d8d8] py-10 text-center text-[13px] leading-[1.4] text-[#454545] max-[1024px]:w-full max-[1024px]:px-8 max-[767px]:px-6 max-[767px]:py-4 max-[767px]:text-left max-[767px]:text-[12px]">
			<span>Cloudflare Ray ID: <strong>{rayId}</strong></span>
			<span aria-hidden="true">&bull;</span>
			<button type="button" class="cursor-pointer border-0 bg-transparent p-0 text-[12px] text-[#454545] max-[900px]:text-[11px]" onclick={reverseGlitch}>Your IP: <span class="cf-link">Click to reveal</span></button>
			<span aria-hidden="true">&bull;</span>
			<span>Performance &amp; security by <a class="cf-link" href={cloudflareInfoUrl} target="_blank" rel="noopener noreferrer">Cloudflare</a></span>
		</footer>
	</div>
</div>

<style>
	.cf-link, .cf-link:visited { color: #2f73bd !important; text-decoration: none; }
	.cf-link:hover, .cf-link:focus-visible { color: #1d5f9f !important; text-decoration: underline; }

	.cf-page {
		opacity: 0;
		visibility: hidden;
	}

	.cf-visible {
		visibility: visible;
		animation: page-in 550ms ease-out forwards;
	}

	.cf-hide {
		visibility: visible;
		opacity: 1;
		animation: page-out 250ms ease-in forwards;
	}

	.glitch-fade {
		animation: canvas-fade 550ms ease-out forwards;
	}

	@keyframes page-in {
		0%   { opacity: 0; filter: brightness(2) saturate(0); }
		40%  { opacity: 1; filter: brightness(1.3) saturate(0.6); }
		100% { opacity: 1; filter: brightness(1) saturate(1); }
	}

	@keyframes page-out {
		0%   { opacity: 1; filter: brightness(1); }
		100% { opacity: 0; filter: brightness(2) saturate(0); }
	}

	@keyframes canvas-fade {
		0%   { opacity: 1; }
		100% { opacity: 0; }
	}
</style>
