<script lang="ts">
	import type { Portfolio } from '$lib/types';
	import SectionHeader from './SectionHeader.svelte';
	
	interface Props {
		data: Portfolio;
	}
	
	let { data }: Props = $props();
</script>

<section id="about" class="border-b border-oc-border">
	<SectionHeader title="Who am I??">
		<p class="text-sm md:text-base text-oc-text mt-3  leading-relaxed">
			{data.portfolio.description}
		</p>
	</SectionHeader>
	
	<div class="px-6 py-8">
		<ul class="space-y-3 mb-8">
			<li class="flex gap-3">
				<span class="text-sunrise flex-shrink-0 text-sm">[*]</span>
				<div class="text-sm md:text-base">
					<span class="text-oc-text-bright font-medium">Current Role</span>
					<span class="text-oc-text ml-3">{data.currentWork.position} at <a href={data.currentWork.companyLink} target="_blank" class="text-sunrise hover:underline">{data.currentWork.company}</a></span>
				</div>
			</li>
			<li class="flex gap-3">
				<span class="text-sunrise flex-shrink-0 text-sm">[*]</span>
				<div class="text-sm md:text-base">
					<span class="text-oc-text-bright font-medium">Research</span>
					<span class="text-oc-text ml-3">Quantum computing and hybrid cloud systems at IISc Bangalore</span>
				</div>
			</li>
			<li class="flex gap-3">
				<span class="text-sunrise flex-shrink-0 text-sm">[*]</span>
				<div class="text-sm md:text-base">
					<span class="text-oc-text-bright font-medium">Publications</span>
					<span class="text-oc-text ml-3">CCGRID 2025, HiPC 2024</span>
				</div>
			</li>
			<li class="flex gap-3">
				<span class="text-sunrise flex-shrink-0 text-sm">[*]</span>
				<div class="text-sm md:text-base">
					<span class="text-oc-text-bright font-medium">Focus</span>
					<span class="text-oc-text ml-3">Scalable systems, cloud infrastructure, and distributed computing</span>
				</div>
			</li>
			<li class="flex gap-3">
				<span class="text-sunrise flex-shrink-0 text-sm">[*]</span>
				<div class="text-sm md:text-base">
					<span class="text-oc-text-bright font-medium">Any stack</span>
					<span class="text-oc-text ml-3">Backend, frontend, infrastructure, and quantum circuits</span>
				</div>
			</li>
		</ul>
		
		<a 
			href="https://drive.google.com/file/d/1Vah8_QZrO2JGBBz2ZQD_zcXtJ_MuYJRn/view?usp=drive_link"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 px-4 py-2 bg-oc-bg-alt border border-oc-border text-sm text-oc-text-bright hover:text-sunrise hover:border-sunrise transition-colors"
		>
			<span>Read resume</span>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="square" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
</section>
