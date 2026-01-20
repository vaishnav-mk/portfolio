<script lang="ts">
	import type { Portfolio } from '$lib/types';
	
	interface Props {
		data: Portfolio;
	}
	
	let { data }: Props = $props();
</script>

<section class="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
	<!-- Status Badge -->
	<div class="inline-flex items-center gap-3 mb-8 px-3 py-1.5 border border-[#333333] bg-[#242424]">
		<span class="text-xs text-[#8e8b8b]">New</span>
		<span class="text-xs text-[#cfcecd]">{data.portfolio.title}</span>
	</div>
	
	<!-- Main Heading -->
	<h1 class="text-3xl md:text-5xl lg:text-6xl font-normal mb-6 text-[#e5e5e5] leading-tight">
		{data.byline}
	</h1>
	
	<!-- Description -->
	<p class="text-sm md:text-base text-[#8e8b8b] mb-10 max-w-2xl leading-relaxed">
		{data.portfolio.description}
	</p>
	
	<!-- Terminal-style command box -->
	<div class="mb-12 border border-[#333333] bg-[#242424] max-w-xl">
		<div class="flex items-center border-b border-[#333333] px-4 py-2">
			<div class="flex items-center gap-4 text-xs text-[#8e8b8b]">
				<span class="text-[#cfcecd] border-b border-[#cfcecd] pb-1">email</span>
				<span>github</span>
				<span>linkedin</span>
			</div>
		</div>
		<div class="p-4 flex items-center justify-between">
			<code class="text-sm text-[#8e8b8b]">
				<span class="text-[#656363]">mailto:</span><span class="text-[#cfcecd]">{data.portfolio.email}</span>
			</code>
			<button 
				class="p-1.5 text-[#8e8b8b] hover:text-[#e5e5e5] transition-colors"
				onclick={() => navigator.clipboard.writeText(data.portfolio.email)}
				aria-label="Copy email"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="square" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
			</button>
		</div>
	</div>
	
	<!-- Social Links -->
	<div class="flex items-center gap-6">
		{#each data.socialLinks as link}
			<a 
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-[#8e8b8b] hover:text-[#e5e5e5] transition-colors"
			>
				{link.label} {#if link.label === 'GitHub'}<span class="text-[#656363]">[↗]</span>{/if}
			</a>
		{/each}
	</div>
</section>
