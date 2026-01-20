<script lang="ts">
	import { page } from '$app/stores';
	
	let mobileMenuOpen = $state(false);
	
	const navItems = [
		{ href: '#about', label: 'About' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<nav class="sticky top-0 z-50 bg-[#1a1a1a] border-b border-[#333333]">
	<div class="max-w-[1200px] mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo/Brand -->
			<a href="/" class="text-[#e5e5e5] hover:text-white transition-colors">
				<span class="text-[#8e8b8b]">~/</span><span class="text-[#cfcecd]">vm</span><span class="text-[#8e8b8b]">:</span>
			</a>
			
			<!-- Desktop Navigation -->
			<ul class="hidden md:flex items-center gap-6">
				{#each navItems as item}
					<li>
						<a 
							href={item.href}
							class="text-sm text-[#8e8b8b] hover:text-[#e5e5e5] transition-colors"
						>
							{item.label}
						</a>
					</li>
				{/each}
				<li>
					<a 
						href="mailto:vaishnavmk.work@gmail.com"
						class="inline-flex items-center gap-2 px-4 py-2 border border-[#333333] text-sm text-[#e5e5e5] hover:bg-[#242424] hover:border-[#444444] transition-colors"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="square" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						Contact
					</a>
				</li>
			</ul>
			
			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2 text-[#8e8b8b] hover:text-[#e5e5e5]"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
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
		
		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<ul class="md:hidden mt-4 pt-4 border-t border-[#333333] space-y-3">
				{#each navItems as item}
					<li>
						<a 
							href={item.href}
							class="block text-sm text-[#8e8b8b] hover:text-[#e5e5e5] transition-colors"
							onclick={() => mobileMenuOpen = false}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</nav>
