<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import type { Portfolio } from '$lib/types';
	import data from '../../portfolio.json';

	const portfolio = data as Portfolio;
	const QR_DARK = '#141414';
	const QR_LIGHT = '#ffd6d1';

	let flipped = $state(false);
	let canShare = $state(false);
	let siteUrl = $state('');
	let displayUrl = $state('');
	let qrDataUrl = $state('');
	let qrError = $state('');

	onMount(() => {
		const currentUrl = window.location.origin;
		siteUrl = currentUrl;
		displayUrl = currentUrl.replace(/^https?:\/\//, '');

		QRCode.toDataURL(currentUrl, {
			errorCorrectionLevel: 'H',
			margin: 2,
			width: 768,
			color: {
				dark: QR_DARK,
				light: QR_LIGHT
			}
		})
			.then((url) => {
				qrDataUrl = url;
			})
			.catch(() => {
				qrError = 'Could not generate QR code.';
			});
		canShare = typeof navigator.share === 'function';
	});

	function toggle() {
		flipped = !flipped;
	}

	async function downloadQr() {
		if (!siteUrl) return;
		const dataUrl = await QRCode.toDataURL(siteUrl, {
			errorCorrectionLevel: 'H',
			margin: 2,
			width: 1024,
			color: {
				dark: QR_DARK,
				light: QR_LIGHT
			}
		});

		const blob = await fetch(dataUrl).then((response) => response.blob());
		const objectUrl = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = 'vaishnav-manoj-qr.png';
		link.href = objectUrl;
		document.body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(objectUrl);
	}

	async function share() {
		if (!siteUrl) return;
		try {
			await navigator.share({
				title: portfolio.portfolio.name,
				text: portfolio.byline,
				url: siteUrl
			});
		} catch (err) {
			if (err instanceof DOMException && err.name === 'AbortError') return;
			await navigator.clipboard?.writeText(siteUrl);
		}
	}
</script>

<Seo
	title="~/vm | QR"
	description="Scan to visit Vaishnav Manoj's portfolio."
	image="/qr/og.svg"
	imageAlt="QR code for Vaishnav Manoj's portfolio"
/>

<section class="border-b border-oc-border">
	<div class="px-4 py-6 md:px-6 md:py-10">
		<p class="mb-2 text-xs uppercase tracking-[0.24em] text-sunrise">qr card</p>
		<h1 class="text-2xl font-medium text-oc-text-bright md:text-4xl">Scan, save, share.</h1>
		<p class="mt-3 max-w-2xl text-sm leading-relaxed text-oc-text md:text-base">
			A small card for passing around the current site URL without saying "link in bio" like a coward.
		</p>
	</div>
</section>

<section class="px-4 py-6 md:px-6 md:py-10">
	<div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
		<div>
			<button
				type="button"
				onclick={toggle}
				class="group block w-full cursor-pointer bg-transparent p-0 text-left [perspective:1400px]"
				aria-label={flipped ? 'Show QR code' : 'Show contact details'}
			>
				<div class="relative min-h-[30rem] w-full transition-transform duration-500 [transform-style:preserve-3d] md:min-h-[26rem] {flipped ? '[transform:rotateY(180deg)]' : ''}">
					<div class="absolute inset-0 grid border border-oc-border bg-oc-bg [backface-visibility:hidden] md:grid-cols-[18rem_minmax(0,1fr)]">
						<div class="flex items-center justify-center border-b border-oc-border bg-[radial-gradient(circle_at_center,rgba(255,166,158,0.10),transparent_62%),var(--color-oc-bg-alt)] p-6 md:border-r md:border-b-0">
							<div class="relative w-full max-w-[16rem] border border-sunrise/50 bg-[#ffd6d1] p-3 shadow-[10px_10px_0_rgba(255,166,158,0.10)]">
								<span class="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-oc-bg/70"></span>
								<span class="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-oc-bg/70"></span>
								<span class="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-oc-bg/70"></span>
								<span class="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-oc-bg/70"></span>
								{#if qrDataUrl}
									<img src={qrDataUrl} alt={`QR code for ${displayUrl}`} class="block aspect-square w-full mix-blend-multiply" draggable="false" />
								{:else if qrError}
									<div class="flex aspect-square items-center justify-center bg-[#ffd6d1] px-4 text-center text-xs uppercase tracking-[0.18em] text-oc-bg/70">{qrError}</div>
								{:else}
									<div class="flex aspect-square items-center justify-center bg-[#ffd6d1] text-xs uppercase tracking-[0.24em] text-oc-bg/70">[loading]</div>
								{/if}
							</div>
						</div>
						<div class="flex min-w-0 flex-col justify-between p-5 md:p-7">
							<div>
								<div class="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-sunrise">
									<span class="h-2 w-2 bg-sunrise"></span>
									<span>qr</span>
								</div>
								<h2 class="text-3xl font-medium leading-none text-oc-text-bright md:text-5xl">{portfolio.portfolio.name}</h2>
								<p class="mt-3 max-w-md text-sm leading-relaxed text-oc-text">{portfolio.byline}</p>
							</div>
							<div class="border-t border-oc-border pt-4">
								<p class="min-w-0 truncate font-mono text-sm text-oc-text-muted">{displayUrl}</p>
							</div>
						</div>
					</div>

					<div class="absolute inset-0 grid border border-oc-border bg-oc-bg [backface-visibility:hidden] [transform:rotateY(180deg)] md:grid-cols-[minmax(0,1fr)_8rem]">
						<div class="flex flex-1 flex-col justify-between p-5 md:p-7">
							<div>
								<p class="mb-4 text-[10px] uppercase tracking-[0.28em] text-sunrise">contact</p>
								<h2 class="text-3xl font-medium leading-none text-oc-text-bright md:text-5xl">{portfolio.portfolio.name}</h2>
								<p class="mt-3 text-sm leading-relaxed text-oc-text">{portfolio.currentWork.position}</p>
								<p class="text-sm text-sunrise">at {portfolio.currentWork.company}</p>
							</div>
							<div class="grid gap-x-4 gap-y-2 border-t border-oc-border pt-4 text-xs md:grid-cols-2">
								<div class="min-w-0">
									<p class="text-sunrise">email</p>
									<p class="truncate text-oc-text-bright">{portfolio.portfolio.email}</p>
								</div>
								{#each portfolio.socialLinks as link}
									<div class="min-w-0">
										<p class="text-sunrise">{link.label.toLowerCase()}</p>
										<p class="truncate text-oc-text-bright">{link.href.replace(/^https?:\/\//, '')}</p>
									</div>
								{/each}
							</div>
						</div>
						<div class="hidden border-l border-oc-border bg-[linear-gradient(135deg,var(--color-oc-bg-alt),var(--color-oc-bg))] md:block"></div>
					</div>
				</div>
			</button>

		</div>

		<aside class="border border-oc-border bg-oc-bg-alt p-4 md:p-5">
			<p class="mb-4 text-xs uppercase tracking-[0.24em] text-sunrise">actions</p>
			<div class="grid gap-3">
				<ActionButton onclick={downloadQr} class="justify-center">
					<span>Download QR</span>
				</ActionButton>
				{#if canShare}
					<ActionButton variant="secondary" onclick={share} class="justify-center">
						<span>Share</span>
					</ActionButton>
				{/if}
			</div>
			<p class="mt-4 break-all font-mono text-xs leading-relaxed text-oc-text-muted">{siteUrl}</p>
		</aside>
	</div>
</section>
