<script lang="ts">
	import blogData from '../../blogs.json';
	import AsciiImage from './AsciiImage.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import { ArrowRightIcon } from '$lib/components/ui/icons';
	import ExternalCorner from '$lib/components/ui/ExternalCorner.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { Blog } from '$lib/types';

	interface Props {
		mediumHref: string;
	}

	let { mediumHref }: Props = $props();

	const blogs = blogData.items satisfies Blog[];
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
				<a
					href={blog.link}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative block px-4 py-4 md:px-6 md:py-5 border-b border-oc-border {i % 2 === 0 ? 'md:border-r' : ''} last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 hover:bg-oc-bg-alt focus-visible:bg-oc-bg-alt"
				>
					<ExternalCorner class="absolute right-4 top-4 md:right-6 md:top-5" />
					{#if blog.image}
						<div class="mb-3 aspect-[16/9] overflow-hidden border border-oc-border bg-oc-bg-alt md:mb-4">
							<AsciiImage src={blog.image} alt={`ASCII preview for ${blog.title}`} width={112} height={36} />
						</div>
					{/if}
					<div class="flex flex-wrap items-center gap-1.5 mb-2 pr-5">
						{#each blog.categories.slice(0, 2) as tag}
							<span class="border border-sunrise/30 bg-sunrise/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-sunrise">{tag}</span>
						{/each}
					</div>
					<h3 class="text-oc-text-bright font-medium mb-2 group-hover:text-sunrise leading-snug">
						{blog.title}
					</h3>
					<p class="text-oc-text-muted text-sm">{formatDate(blog.pubDate)}</p>
				</a>
			{/each}
		</div>
		
		<div class="px-4 py-4 md:px-6 md:py-5 border-t border-oc-border">
			<SwipeLink 
				href={mediumHref}
				variant="inline"
				class="text-sm text-oc-text-bright"
			>
				<span>Read all blogs on Medium</span>
				<ArrowRightIcon />
			</SwipeLink>
		</div>
	{/if}
</section>
