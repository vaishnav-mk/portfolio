<script lang="ts">
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';
	import { getSectionContext } from '$lib/section-context.svelte';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import { CloseIcon, MenuIcon } from '$lib/components/ui/icons';

	interface Props {
		name: string;
		githubHref: string;
	}

	let { name, githubHref }: Props = $props();

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const { activeSection, navItems } = getSectionContext();

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 10;
		};

		// Initialize state based on current scroll position
		handleScroll();

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

	<nav class="sticky top-0 z-50 border-b border-oc-border bg-oc-bg/95" aria-label="Main navigation">
	<div class="flex items-center justify-between px-6 py-3">
		<a
			href="/qr"
			class="brand text-oc-text-bright hover:text-sunrise focus-visible:text-sunrise cursor-pointer transition-colors {scrolled ? 'scrolled' : ''}"
		>
			<span class="brand-full">
				<span class="text-oc-text-bright font-medium">{name}</span>
			</span>
			<span class="brand-short">
				<span class="text-oc-text-muted">~/</span>
				<span class="text-oc-text-bright font-medium">vm</span>
				<span class="text-oc-text-muted">:</span>
			</span>
		</a>
		
		<div class="hidden md:flex items-center gap-3">
			{#each navItems as item (item.id)}
				<SwipeLink
					href={item.href}
					variant="nav"
					active={$activeSection === item.id}
					ariaCurrent={$activeSection === item.id ? 'location' : undefined}
				>
					{item.label}
				</SwipeLink>
			{/each}
			<SwipeLink 
				href={githubHref}
				variant="nav"
				ariaLabel={`Open ${name} on GitHub`}
			>
				GitHub
			</SwipeLink>
		</div>
		
		<ActionButton
			variant="ghost"
			ariaExpanded={mobileMenuOpen}
			ariaControls="mobile-navigation"
			class="md:hidden p-2"
			onclick={() => mobileMenuOpen = !mobileMenuOpen}
			ariaLabel="Toggle menu"
		>
		{#if mobileMenuOpen}
			<span transition:scale={{ duration: 120 }}><CloseIcon /></span>
		{:else}
			<span transition:scale={{ duration: 120 }}><MenuIcon /></span>
		{/if}
		</ActionButton>
	</div>
	
	{#if mobileMenuOpen}
		<div id="mobile-navigation" class="md:hidden border-t border-oc-border px-6 py-4 space-y-2" transition:slide={{ duration: 160 }}>
			{#each navItems as item (item.id)}
				<SwipeLink
					href={item.href}
					variant="nav"
					active={$activeSection === item.id}
					ariaCurrent={$activeSection === item.id ? 'location' : undefined}
					onclick={() => mobileMenuOpen = false}
				>
					{$activeSection === item.id ? '>' : ''}{item.label}
				</SwipeLink>
			{/each}
		</div>
	{/if}
</nav>

<style>
	:global(.brand) {
		display: inline-grid;
		align-items: center;
		overflow: hidden;
		font-size: 0.875rem; /* text-sm */
	}

	.brand-full,
	.brand-short {
		grid-area: 1 / 1;
		display: inline-flex;
		white-space: nowrap;
		transition: opacity 200ms ease;
	}

	.brand-short {
		opacity: 0;
	}

	.brand-full {
		opacity: 1;
	}

	:global(.brand.scrolled .brand-full) {
		opacity: 0;
	}

	:global(.brand.scrolled .brand-short) {
		opacity: 1;
	}

</style>
