<script lang="ts">
	import blogData from '../../blogs.json';
	import SectionHeader from './SectionHeader.svelte';
	import AsciiImage from './AsciiImage.svelte';

	const blogs = blogData.rss.channel.item;

	function getFixedImage(blog: any) {
		const match = blog['content:encoded']?.match(/src="([^"]*)"/);
		return match ? match[1] : null;
	}

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<section id="blogs" class="border-b border-oc-border">
	<SectionHeader 
		title="Blogs" 
		description="Writing about quantum computing, web development, and more."
	/>

	{#if blogs.length === 0}
		<p class="px-6 py-8 text-oc-text-muted">No blogs to display.</p>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2">
			{#each blogs as blog, i}
				{@const image = getFixedImage(blog)}
				<a
					href={blog.link}
					target="_blank"
					rel="noopener noreferrer"
					class="block px-6 py-5 border-b border-oc-border {i % 2 === 0 ? 'md:border-r' : ''} last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 hover:bg-oc-bg-alt transition-colors group"
				>
					{#if image}
						<div class="mb-3">
							<AsciiImage src={image} alt={blog.title} width={90} height={28} />
						</div>
					{/if}
					<div class="flex flex-wrap items-center gap-2 mb-2">
						{#each (blog.category || []).slice(0, 2) as tag}
							<span class="text-[11px] uppercase tracking-wide text-sunrise">{tag}</span>
						{/each}
					</div>
					<h3 class="text-oc-text-bright font-medium mb-2 group-hover:text-sunrise transition-colors leading-snug">
						{blog.title}
					</h3>
					<p class="text-oc-text-muted text-sm">{formatDate(blog.pubDate)}</p>
				</a>
			{/each}
		</div>
		
		<div class="px-6 py-5 border-t border-oc-border">
			<a 
				href="https://medium.com/@wishee"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-oc-text-bright hover:text-sunrise transition-colors"
			>
				<span>Read all blogs on Medium</span>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="square" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	{/if}
</section>
