<script lang="ts">
	import type { Project } from '$lib/types';
	
	interface Props {
		projects: Project[];
	}
	
	let { projects }: Props = $props();
</script>

<section id="projects" class="border-t border-[#333333] bg-[#242424]">
	<div class="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
		<!-- Section Header -->
		<div class="mb-10">
			<h2 class="text-2xl md:text-3xl text-[#e5e5e5]">Projects</h2>
		</div>
		
		<!-- Projects Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#333333]">
			{#each projects as project}
				<article class="bg-[#1a1a1a] p-6 group hover:bg-[#242424] transition-colors">
					<!-- Project Title -->
					<div class="flex items-start justify-between gap-3 mb-3">
						<h3 class="text-base text-[#e5e5e5] font-medium">
							{project.title}
						</h3>
						<div class="flex items-center gap-2 flex-shrink-0">
							{#if project.source}
								<a 
									href={project.source}
									target="_blank"
									rel="noopener noreferrer"
									class="text-[#656363] hover:text-[#e5e5e5] transition-colors"
									aria-label="View source"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
									</svg>
								</a>
							{/if}
							{#if project.visit}
								<a 
									href={project.visit}
									target="_blank"
									rel="noopener noreferrer"
									class="text-[#656363] hover:text-[#e5e5e5] transition-colors"
									aria-label="Visit project"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="square" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
							{/if}
						</div>
					</div>
					
					<!-- Description -->
					<p class="text-xs text-[#8e8b8b] mb-4 leading-relaxed">
						{project.description}
					</p>
					
					<!-- Tech Stack -->
					<p class="text-[10px] text-[#656363] uppercase tracking-wider">
						{project.tech}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
