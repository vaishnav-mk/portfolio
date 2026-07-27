<script lang="ts">
	import type { Portfolio } from '$lib/types';
	import SectionHeader from './SectionHeader.svelte';
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import { ArrowRightIcon } from '$lib/components/ui/icons';
	import ExternalCorner from '$lib/components/ui/ExternalCorner.svelte';
	
	interface Props {
		data: Portfolio;
	}
	
	let { data }: Props = $props();

	type AboutLink = NonNullable<Portfolio['about'][number]['link']>;

	function itemLinks(item: Portfolio['about'][number]): AboutLink[] {
		return [item.link, ...(item.links ?? [])].filter((link): link is AboutLink => Boolean(link));
	}
</script>

<section id="about" class="border-b border-oc-border">
	<SectionHeader title="Who am I??">
		<p class="text-sm md:text-base text-oc-text mt-3  leading-relaxed">
			{data.portfolio.description}
		</p>
	</SectionHeader>
	
	<div class="px-4 py-5 md:px-6 md:py-8">
		<ul class="mb-6 space-y-2.5 md:mb-8 md:space-y-3">
			<li class="flex">
				<span class="terminal-marker mt-0.5">[*]</span>
				<div class="grid gap-x-4 gap-y-1 text-sm md:grid-cols-[max-content_minmax(0,1fr)] md:text-base">
					<span class="text-oc-text-bright font-medium">Current Role</span>
					<span class="text-oc-text">
						{data.currentWork.position}
						<SwipeLink href={data.currentWork.companyLink} variant="inline" class="ml-1 !min-h-0 !p-0 text-sunrise" arrow>at {data.currentWork.company}</SwipeLink>
					</span>
				</div>
			</li>
			{#each data.about as item}
				{@const links = itemLinks(item)}
				<li class="flex">
					<span class="terminal-marker mt-0.5">[*]</span>
					<div class="grid gap-x-4 gap-y-1 text-sm md:grid-cols-[max-content_minmax(0,1fr)] md:text-base">
						<span class="text-oc-text-bright font-medium">{item.label}</span>
						<span class="text-oc-text">
							{#if item.value}{item.value}{/if}
							{#each links as link, i}
								{#if item.value || i > 0}{i > 0 ? ', ' : ' '}{/if}<SwipeLink href={link.href} variant="inline" class="!min-h-0 !p-0 text-sunrise" arrow>{link.text}</SwipeLink>
							{/each}
						</span>
					</div>
				</li>
			{/each}
		</ul>
		
		<a
			href={data.resumeLink}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative inline-flex min-h-12 items-center gap-3 border border-oc-border bg-oc-bg px-5 py-3 text-sm font-semibold text-oc-text-bright transition-colors hover:border-sunrise/60 hover:bg-sunrise/10 focus-visible:border-sunrise/60 focus-visible:bg-sunrise/10"
		>
			<ExternalCorner class="absolute right-2 top-2" />
			<span>Read resume</span>
			<ArrowRightIcon />
		</a>
	</div>
</section>
