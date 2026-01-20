<script lang="ts">
	import { getSectionContext } from '$lib/section-context.svelte';

	let mobileMenuOpen = $state(false);

	const { activeSection, navItems } = getSectionContext();
</script>

<nav class="sticky top-0 z-50 bg-oc-bg border-b border-oc-border">
	<div class="flex items-center justify-between px-6 py-3">
		<a href="/" class="text-oc-text-bright hover:text-sunrise transition-colors text-sm cursor-pointer">
			<span class="text-oc-text-muted">~/</span><span class="text-oc-text-bright font-medium">vm</span><span class="text-oc-text-muted">:</span>
		</a>
		
		<div class="hidden md:flex items-center gap-4">
			{#each navItems as item (item.id)}
				<a
					href={item.href}
					class="text-sm px-2 py-1 transition-all cursor-pointer"
					style:color={$activeSection === item.id ? 'var(--color-oc-bg)' : 'var(--color-oc-text)'}
					style:background-color={$activeSection === item.id ? 'var(--color-sunrise)' : 'transparent'}
				>
					{item.label}
				</a>
			{/each}
			<a 
				href="https://github.com/vaishnav-mk"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-oc-text hover:text-oc-text-bright transition-colors cursor-pointer"
			>
				GitHub
			</a>
		</div>
		
		<button
			class="md:hidden p-2 text-oc-text hover:text-sunrise"
			onclick={() => mobileMenuOpen = !mobileMenuOpen}
			aria-label="Toggle menu"
		>
			{#if mobileMenuOpen}
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="square" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="square" stroke-width="1" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>
	</div>
	
	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-oc-border px-6 py-4 space-y-2">
			{#each navItems as item (item.id)}
				<a
					href={item.href}
					class="block text-sm px-2 py-1 transition-all cursor-pointer"
					style:color={$activeSection === item.id ? 'var(--color-oc-bg)' : 'var(--color-oc-text)'}
					style:background-color={$activeSection === item.id ? 'var(--color-sunrise)' : 'transparent'}
					onclick={() => mobileMenuOpen = false}
				>
					{$activeSection === item.id ? '>' : ''}{item.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>
