<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { createSectionContext, useSectionObserver } from '$lib/section-context.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const sectionState = createSectionContext();
	useSectionObserver(sectionState, $page.url.pathname === '/');
</script>

<svelte:head>
	<title>~/vm: Vaishnav Manoj</title>
	<meta name="description" content="Developer and researcher passionate about scalable systems, cloud infrastructure, and quantum computing." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-oc-bg text-oc-text-bright">
	<div class="max-w-[1140px] mx-auto border-l border-r border-oc-border min-h-screen flex flex-col">
		<Navigation />
		
		<main class="flex-1">
			{@render children()}
		</main>
		
		<Footer />
	</div>
</div>
