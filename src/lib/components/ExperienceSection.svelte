<script lang="ts">
	import type { Experience } from '$lib/types';
	
	interface Props {
		experiences: Experience[];
	}
	
	let { experiences }: Props = $props();
	
	let expandedIndex = $state<number | null>(null);
</script>

<section id="experience" class="border-t border-[#333333] bg-[#1a1a1a]">
	<div class="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
		<!-- Section Header -->
		<div class="mb-10">
			<h2 class="text-2xl md:text-3xl text-[#e5e5e5]">Experience</h2>
		</div>
		
		<!-- Experience List -->
		<div class="space-y-0">
			{#each experiences as exp, i}
				<article class="border-b border-[#333333]">
					<button 
						class="w-full py-4 flex items-start justify-between gap-4 text-left hover:bg-[#242424] transition-colors group"
						onclick={() => expandedIndex = expandedIndex === i ? null : i}
					>
						<div class="flex-1 min-w-0">
							<div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-1">
								<h3 class="text-sm text-[#e5e5e5] font-medium">
									{exp.title}
								</h3>
								<span class="hidden md:inline text-[#333333]">—</span>
								<a 
									href={exp.companyLink}
									target="_blank"
									rel="noopener noreferrer"
									class="text-sm text-[#8e8b8b] hover:text-[#cfcecd] transition-colors"
									onclick={(e) => e.stopPropagation()}
								>
									{exp.company}
								</a>
							</div>
							<p class="text-xs text-[#656363]">{exp.date} · {exp.location}</p>
						</div>
						
						<div class="flex-shrink-0 pt-1">
							<svg 
								class="w-4 h-4 text-[#656363] group-hover:text-[#8e8b8b] transition-transform {expandedIndex === i ? 'rotate-180' : ''}" 
								fill="none" 
								stroke="currentColor" 
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="square" stroke-width="1" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</button>
					
					{#if expandedIndex === i}
						<div class="pb-4 pl-0 md:pl-4">
							<p class="text-xs text-[#656363] mb-4">{exp.companyDescription}</p>
							<ul class="space-y-2">
								{#each exp.highlights as highlight}
									<li class="flex gap-3 text-xs text-[#8e8b8b] leading-relaxed">
										<span class="text-[#656363] flex-shrink-0">[*]</span>
										<span>{highlight}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>
