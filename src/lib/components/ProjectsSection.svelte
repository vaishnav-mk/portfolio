<script lang="ts">
	import type { Project } from '$lib/types';
	import SectionHeader from './SectionHeader.svelte';
	import { GitHubIcon } from '$lib/components/ui/icons';
	import ExternalCorner from '$lib/components/ui/ExternalCorner.svelte';
	
	interface Props {
		projects: Project[];
	}
	
	let { projects }: Props = $props();
</script>

<section id="projects" class="border-b border-oc-border">
	<SectionHeader 
		title="Projects" 
		description="A selection of projects I've built and contributed to."
	/>
	
	<div class="grid grid-cols-1 md:grid-cols-2">
		{#each projects as project, i}
			{@const href = project.visit || project.source}
			{#if href}
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative block px-4 py-4 md:px-6 md:py-5 border-b border-oc-border {i % 2 === 0 ? 'md:border-r' : ''} last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 transition-colors hover:bg-oc-bg-alt focus-visible:bg-oc-bg-alt"
				>
					<ExternalCorner class="absolute right-4 top-4 md:right-6 md:top-5" />
					<div class="flex items-start justify-between gap-4 mb-2">
						<h3 class="text-oc-text-bright font-medium group-hover:text-sunrise transition-colors flex items-center gap-2">
							{#if project.source}
								<GitHubIcon class="text-oc-text-muted" />
							{/if}
							{project.title}
						</h3>
					</div>
					<p class="text-oc-text mb-3 leading-relaxed">{project.description}</p>
					<p class="text-oc-text-muted text-[13px]">{project.tech}</p>
				</a>
			{:else}
				<article class="px-4 py-4 md:px-6 md:py-5 border-b border-oc-border {i % 2 === 0 ? 'md:border-r' : ''} last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0">
					<h3 class="text-oc-text-bright font-medium mb-2">{project.title}</h3>
					<p class="text-oc-text mb-3 leading-relaxed">{project.description}</p>
					<p class="text-oc-text-muted text-[13px]">{project.tech}</p>
				</article>
			{/if}
		{/each}
	</div>
</section>
