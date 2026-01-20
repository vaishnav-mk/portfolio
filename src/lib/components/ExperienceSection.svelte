<script lang="ts">
	import type { Experience } from '$lib/types';
	import SectionHeader from './SectionHeader.svelte';
	
	interface Props {
		experiences: Experience[];
	}
	
	let { experiences }: Props = $props();
	
	let expandedIndex = $state<number | null>(0);
</script>

<section id="experience" class="border-b border-oc-border">
	<SectionHeader 
		title="Experience" 
		description="My professional journey through internships and research positions."
	/>
	
	<div>
		{#each experiences as exp, i}
			<div class="border-b border-oc-border last:border-b-0">
				<button 
					class="w-full px-6 py-4 flex items-center justify-between gap-6 text-left transition-colors group cursor-pointer"
					onclick={() => expandedIndex = expandedIndex === i ? null : i}
				>
					<div class="flex items-center gap-3">
						<span class="text-oc-text-muted group-hover:text-sunrise transition-colors">
							{#if expandedIndex === i}
								<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="square" stroke-width="2" d="M20 12H4" />
								</svg>
							{:else}
								<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="square" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
							{/if}
						</span>
						<span class="text-oc-text-bright font-medium group-hover:text-sunrise transition-colors">{exp.title} at {exp.company}</span>
					</div>
					<span class="text-oc-text-muted hidden md:block whitespace-nowrap text-sm">{exp.date}</span>
				</button>
				
				{#if expandedIndex === i}
					<div class="px-6 pb-5 pl-12">
						<p class="text-oc-text mb-4 leading-relaxed">
							{exp.companyDescription}. {exp.location}.
						</p>
						<ul class="space-y-2">
							{#each exp.highlights as highlight}
								<li class="flex gap-3 text-oc-text leading-relaxed">
									<span class="text-sunrise flex-shrink-0">[*]</span>
									<span>{highlight}</span>
								</li>
							{/each}
						</ul>
						<div class="mt-4">
							<a 
								href={exp.companyLink}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sunrise hover:underline transition-colors"
							>
								{exp.companyLink.replace('https://', '').replace('www.', '')}
							</a>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
