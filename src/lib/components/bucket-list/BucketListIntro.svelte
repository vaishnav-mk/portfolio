<script lang="ts">
	import type { BucketListMetadata } from '$lib/bucket-list';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import { MapPinIcon } from '$lib/components/ui/icons';
	import ExternalCorner from '$lib/components/ui/ExternalCorner.svelte';

	interface Props {
		startDate: string;
		averageLifeExpectancy: number;
		quote: string;
		location: BucketListMetadata['location'];
		inspirationLink: string;
		currentAge: number;
		lifePercentage: number;
		timeLeft: string;
		progressPercentage: number;
		completedCount: number;
		totalCount: number;
		showAddForm: boolean;
		onToggleAddForm: () => void;
	}

	let {
		startDate,
		averageLifeExpectancy,
		quote,
		location,
		inspirationLink,
		currentAge,
		lifePercentage,
		timeLeft,
		progressPercentage,
		completedCount,
		totalCount,
		showAddForm,
		onToggleAddForm
	}: Props = $props();
</script>

<div class="grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
	<div class="min-w-0">
		<p class="mb-2 text-xs uppercase tracking-[0.24em] text-sunrise md:mb-3">10 year list</p>
		<h1 class="mb-3 text-2xl font-medium text-oc-text-bright md:mb-4 md:text-3xl">Bucket List</h1>
		
		<p class="mb-4 max-w-3xl text-oc-text leading-relaxed md:mb-6">
			<span class="text-oc-text-bright">The clock is already running.</span>
			I'm <span class="text-sunrise font-mono tabular-nums">{currentAge.toFixed(9)}</span> years in - roughly
			<span class="text-sunrise font-mono tabular-nums">{lifePercentage.toFixed(9)}%</span> through a {averageLifeExpectancy}-year shot at doing this properly.
		</p>

		<p class="mb-5 max-w-3xl border-l border-sunrise/50 pl-4 text-oc-text italic md:mb-8">"{quote}"</p>

		<div class="mb-5 grid gap-2.5 sm:grid-cols-3 md:mb-6 md:gap-3">
			<div class="flex min-h-20 flex-col justify-center border border-oc-border bg-oc-bg px-4 py-3">
				<p class="text-xs uppercase tracking-wide text-oc-text-muted">Started</p>
				<p class="mt-1 text-sunrise">{startDate}</p>
			</div>
			<div class="flex min-h-20 flex-col justify-center border border-oc-border bg-oc-bg px-4 py-3">
				<p class="text-xs uppercase tracking-wide text-oc-text-muted">Ends</p>
				<p class="mt-1 text-sunrise">{timeLeft}</p>
			</div>
			<a
				href={inspirationLink}
				target="_blank"
				rel="noopener noreferrer"
				class="group relative flex min-h-20 flex-col justify-center border border-oc-border bg-oc-bg px-4 py-3 text-oc-text transition-colors hover:border-sunrise/60 hover:bg-sunrise/10 hover:text-oc-text-bright focus-visible:border-sunrise/60 focus-visible:bg-sunrise/10"
			>
				<ExternalCorner class="absolute right-3 top-3" />
				<span class="block text-xs uppercase tracking-wide text-oc-text-muted">Reference</span>
				<span class="mt-1 block text-oc-text-bright">Inspiration &rarr;</span>
			</a>
		</div>

		<div class="mb-5 flex items-center gap-4 md:mb-6 md:gap-6">
			<div class="flex-1">
				<div class="w-full bg-oc-border h-1.5" aria-hidden="true">
					<div class="bg-sunrise h-full transition-all duration-500" style="width: {progressPercentage}%"></div>
				</div>
			</div>
			<span class="text-sunrise font-mono whitespace-nowrap">
				{completedCount}/{totalCount} completed
			</span>
		</div>

		<ActionButton ariaExpanded={showAddForm} onclick={onToggleAddForm}>
			{showAddForm ? 'Cancel' : '+ Add New'}
		</ActionButton>
	</div>

	<div class="relative w-full max-w-[180px] justify-self-center border border-oc-border bg-oc-bg p-2 shadow-[10px_10px_0_rgba(255,166,158,0.18)] sm:max-w-[260px] lg:max-w-[300px] lg:justify-self-end">
		<div class="mb-2 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.2em] text-oc-text-muted">
			<span>checkpoint</span>
			<span class="text-sunrise">{completedCount}/{totalCount}</span>
		</div>
		<div class="relative overflow-hidden border border-oc-border">
			<picture>
				<source srcset="/trip2-480.avif 480w" sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 180px" type="image/avif" />
				<source srcset="/trip2-480.webp 480w" sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 180px" type="image/webp" />
				<img
					src="/trip2-480.webp"
					alt="Bungee jumping over the hills in Ooty"
					width="480"
					height="853"
					fetchpriority="high"
					decoding="async"
					class="aspect-[9/13] w-full object-cover object-center brightness-90 saturate-[0.9]"
				/>
			</picture>
			<div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-oc-bg via-oc-bg/60 to-transparent"></div>
			<a
				href={location.mapLink}
				target="_blank"
				rel="noopener noreferrer"
				class="group absolute bottom-3 right-3 inline-flex min-h-12 items-center justify-center gap-3 border border-oc-border bg-oc-bg/95 px-5 py-3 text-sm font-semibold text-oc-text-bright shadow-[0_0_24px_rgba(0,0,0,0.45)] transition-colors hover:border-sunrise/60 hover:bg-sunrise/10 focus-visible:border-sunrise/60 focus-visible:bg-sunrise/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-sunrise"
				aria-label={`Open ${location.name} on Google Maps`}
			>
				<ExternalCorner class="absolute right-2 top-2" />
				<MapPinIcon />
				<span>{location.name}</span>
			</a>
		</div>
	</div>
</div>
