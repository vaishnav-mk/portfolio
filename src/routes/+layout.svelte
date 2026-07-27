<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { createSectionContext, useSectionObserver } from '$lib/section-context.svelte';
	import data from '../portfolio.json';
	import type { Portfolio } from '$lib/types';

	let { children } = $props();

	const portfolioData = data as Portfolio;
	const sectionState = createSectionContext();
	useSectionObserver(sectionState);
</script>

<svelte:head>
	<title>~/vm: {portfolioData.portfolio.name}</title>
</svelte:head>

<div class="site-backdrop min-h-screen bg-oc-bg text-oc-text-bright">
	<div class="relative z-10 max-w-[1140px] mx-auto border-l border-r border-oc-border bg-oc-bg/96 min-h-screen flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.45)]">
		<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-sunrise focus:text-oc-bg focus:px-4 focus:py-2 focus:font-semibold">
			Skip to content
		</a>
		<Navigation name={portfolioData.portfolio.name} githubHref={portfolioData.socialLinks.find((l) => l.id === 'github')?.href ?? ''} />
		
		<main id="main-content" class="flex-1">
			{@render children()}
		</main>
		
		<Footer name={portfolioData.portfolio.name} email={portfolioData.portfolio.email} socialLinks={portfolioData.socialLinks} />
	</div>
</div>
