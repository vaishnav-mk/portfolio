<script lang="ts">
	import type { Experience } from '$lib/types';
	import { slide } from 'svelte/transition';
	import SectionHeader from './SectionHeader.svelte';
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import { PlusIcon, MinusIcon } from '$lib/components/ui/icons';
	
	interface Props {
		experiences: Experience[];
	}
	
	let { experiences }: Props = $props();
	
	let expandedIndex = $state<number | null>(0);

	function isLinkedHighlight(highlight: Experience['highlights'][number]): highlight is Exclude<Experience['highlights'][number], string> {
		return typeof highlight !== 'string';
	}
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
					type="button"
					id={`experience-trigger-${i}`}
					aria-expanded={expandedIndex === i}
					aria-controls={`experience-panel-${i}`}
					class="w-full px-4 py-3.5 md:px-6 md:py-4 flex items-center justify-between gap-4 md:gap-6 text-left transition-colors group cursor-pointer hover:bg-oc-bg-alt focus-visible:bg-oc-bg-alt focus-visible:text-oc-text-bright"
					onclick={() => expandedIndex = expandedIndex === i ? null : i}
				>
					<div class="flex items-center gap-3">
					<span class="text-oc-text-muted group-hover:text-sunrise transition-colors">
					{#if expandedIndex === i}
						<MinusIcon />
					{:else}
						<PlusIcon />
					{/if}
					</span>
					<div>
						<span class="text-oc-text-bright font-medium group-hover:text-sunrise transition-colors">{exp.title} at {exp.company}</span>
						<span class="block text-oc-text-muted text-xs mt-0.5 md:hidden">{exp.date}</span>
					</div>
				</div>
				<span class="text-oc-text-muted hidden md:block whitespace-nowrap text-sm">{exp.date}</span>
				</button>
				
				{#if expandedIndex === i}
					<div id={`experience-panel-${i}`} role="region" aria-labelledby={`experience-trigger-${i}`} class="px-4 pb-4 pl-9 md:px-6 md:pb-5 md:pl-12" transition:slide={{ duration: 180 }}>
						<p class="text-oc-text mb-4 leading-relaxed">
							{exp.companyDescription}. {exp.location}.
						</p>
						<ul class="space-y-2">
							{#each exp.highlights as highlight}
								<li class="flex text-oc-text leading-relaxed">
									<span class="terminal-marker">[*]</span>
									<span>
										{#if isLinkedHighlight(highlight)}
											{highlight.text}
											<SwipeLink href={highlight.link.href} variant="inline" class="text-sunrise" arrow>{highlight.link.text}</SwipeLink>
										{:else}
											{highlight}
										{/if}
									</span>
								</li>
							{/each}
						</ul>
						<div class="mt-4">
							<SwipeLink 
								href={exp.companyLink}
								class="text-sunrise"
							>
								{exp.companyLink.replace('https://', '').replace('www.', '')}
							</SwipeLink>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
