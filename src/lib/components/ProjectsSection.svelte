<script lang="ts">
	import type { Project } from '$lib/types';
	import SectionHeader from './SectionHeader.svelte';
	
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
			<article class="px-6 py-5 border-b border-oc-border {i % 2 === 0 ? 'md:border-r' : ''} last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 hover:bg-oc-bg-alt transition-colors group cursor-pointer">
				<div class="flex items-start justify-between gap-4 mb-2">
					<h3 class="text-oc-text-bright font-medium group-hover:text-sunrise transition-colors flex items-center gap-2">
						{#if project.source}
							<svg class="w-4 h-4 text-oc-text-muted" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
							</svg>
						{/if}
						{project.title}
					</h3>
					<div class="flex items-center gap-3 flex-shrink-0">
						{#if project.source}
							<a 
								href={project.source}
								target="_blank"
								rel="noopener noreferrer"
								class="text-oc-text-muted hover:text-sunrise transition-colors"
								aria-label="View source"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="square" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						{/if}
					</div>
				</div>
				
				<p class="text-oc-text mb-3 leading-relaxed">
					{project.description}
				</p>
				
				<p class="text-oc-text-muted text-[13px]">
					{project.tech}
				</p>
			</article>
		{/each}
	</div>
</section>
