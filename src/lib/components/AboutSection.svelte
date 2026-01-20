<script lang="ts">
	import type { Portfolio } from '$lib/types';
	
	interface Props {
		data: Portfolio;
	}
	
	let { data }: Props = $props();
	
	const skills = [
		{ category: 'Backend', items: ['Golang', 'Node.js', 'Python', 'TypeScript'] },
		{ category: 'Cloud', items: ['AWS', 'Azure', 'IBM Quantum', 'Cloudflare'] },
		{ category: 'Databases', items: ['ScyllaDB', 'Elasticsearch', 'Redis', 'RDS'] },
		{ category: 'Frontend', items: ['React', 'Next.js', 'Svelte', 'Tailwind'] },
		{ category: 'Tools', items: ['Docker', 'Kubernetes', 'Kafka', 'RabbitMQ'] },
		{ category: 'Quantum', items: ['Qiskit', 'Cirq', 'QAOA', 'Quantum Walks'] }
	];
</script>

<section id="about" class="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
	<!-- Section Header -->
	<div class="mb-10">
		<h2 class="text-2xl md:text-3xl text-[#e5e5e5] mb-2">What is ~/vm?</h2>
		<p class="text-sm text-[#8e8b8b] max-w-2xl">
			{data.portfolio.description}
		</p>
	</div>
	
	<!-- Features List -->
	<ul class="space-y-3 mb-12">
		<li class="flex gap-3 text-sm">
			<span class="text-[#656363]">[*]</span>
			<div class="text-[#cfcecd]">
				<strong class="text-[#e5e5e5]">Current Role</strong> {data.currentWork.position} at 
				<a href={data.currentWork.companyLink} target="_blank" class="text-[#8e8b8b] hover:text-[#e5e5e5]">{data.currentWork.company}</a>
			</div>
		</li>
		<li class="flex gap-3 text-sm">
			<span class="text-[#656363]">[*]</span>
			<div class="text-[#cfcecd]">
				<strong class="text-[#e5e5e5]">Research</strong> Quantum computing and hybrid cloud systems at IISc Bangalore
			</div>
		</li>
		<li class="flex gap-3 text-sm">
			<span class="text-[#656363]">[*]</span>
			<div class="text-[#cfcecd]">
				<strong class="text-[#e5e5e5]">Publications</strong> CCGRID 2025, HiPC 2024
			</div>
		</li>
		<li class="flex gap-3 text-sm">
			<span class="text-[#656363]">[*]</span>
			<div class="text-[#cfcecd]">
				<strong class="text-[#e5e5e5]">Focus</strong> Scalable systems, cloud infrastructure, and distributed computing
			</div>
		</li>
	</ul>
	
	<!-- Skills Grid -->
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
		{#each skills as skillGroup}
			<div>
				<h4 class="text-xs text-[#656363] uppercase tracking-wider mb-3 border-b border-[#333333] pb-2">
					{skillGroup.category}
				</h4>
				<ul class="space-y-1.5">
					{#each skillGroup.items as skill}
						<li class="text-xs text-[#8e8b8b]">{skill}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	
	<!-- Resume Link -->
	<div class="mt-10">
		{#each data.socialLinks.filter(link => link.label === 'resume') as link}
			<a 
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-sm text-[#8e8b8b] hover:text-[#e5e5e5] transition-colors"
			>
				<span>Read resume</span>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="square" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		{/each}
	</div>
</section>
