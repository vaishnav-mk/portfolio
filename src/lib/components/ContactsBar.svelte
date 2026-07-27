<script lang="ts">
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import { CheckIcon, CopyIcon } from '$lib/components/ui/icons';
	import type { SocialLink } from '$lib/types';

	interface Props {
		email: string;
		socialLinks: SocialLink[];
		resumeLink: string;
	}
	
	let { email, socialLinks, resumeLink }: Props = $props();
	
	let defaultTab = $derived(socialLinks.find((l) => l.isPreferred)?.id ?? socialLinks[0]?.id ?? 'email');
	let activeTab = $state('');
	$effect(() => { if (!activeTab) activeTab = defaultTab; });
	let copied = $state(false);

	function stripProtocol(url: string) {
		return url.replace(/^https?:\/\//, '');
	}
	
	let tabs = $derived([
		{ id: 'email', label: 'email', content: email, prefix: 'mailto:', isPreferred: false },
		...socialLinks.map((l) => ({
			id: l.id,
			label: l.label.toLowerCase(),
			content: stripProtocol(l.href),
			prefix: 'https://',
			isPreferred: l.isPreferred ?? false
		})),
		{ id: 'resume', label: 'resume', content: stripProtocol(resumeLink), prefix: 'https://', isPreferred: false },
	]);
	
	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => copied = false, 1500);
		} catch {
			copied = false;
		}
	}
</script>

<div class="border-t border-oc-border">
	<div class="border-b border-oc-border bg-oc-bg-alt overflow-x-auto overflow-y-hidden contacts-tabs">
		<div class="flex items-stretch min-w-max" role="tablist" aria-label="Contact links">
		{#each tabs as tab}
			<button
				type="button"
				id={`contact-tab-${tab.id}`}
				role="tab"
				aria-selected={activeTab === tab.id}
				aria-controls={`contact-panel-${tab.id}`}
			class="px-4 py-2.5 md:px-5 md:py-3 text-xs bg-transparent border-b-2 -mb-px transition-all duration-150 inline-flex items-center gap-2 whitespace-nowrap focus-visible:bg-oc-bg focus-visible:text-oc-text-bright
				{activeTab === tab.id 
					? tab.isPreferred
						? 'text-oc-text-bright border-twitter' 
						: 'text-oc-text-bright border-sunrise'
					: 'text-oc-text-muted border-transparent hover:text-oc-text'}"
			onclick={() => activeTab = tab.id}
		>
			<span class="{tab.isPreferred ? 'text-twitter font-semibold' : ''}">{tab.label}</span>
			{#if tab.isPreferred}
				<span class="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 bg-twitter/70 text-white leading-none">reach</span>
			{/if}
			</button>
		{/each}
		</div>
	</div>
	
	{#each tabs as tab}
		{#if activeTab === tab.id}
			<div
				id={`contact-panel-${tab.id}`}
				role="tabpanel"
				aria-labelledby={`contact-tab-${tab.id}`}
				class="px-4 py-3 md:px-5 md:py-3.5 flex items-center justify-between gap-3 md:gap-4 bg-oc-bg"
			>
				<div class="flex-1 overflow-x-auto overflow-y-hidden contacts-link">
					<SwipeLink 
						href={tab.prefix + tab.content}
						target={tab.id === 'email' ? '_self' : '_blank'}
						variant="inline"
				class="font-mono text-xs text-oc-text whitespace-nowrap"
				>
					<span class="text-oc-text-muted">{tab.prefix}</span><span class="{tab.isPreferred ? 'text-twitter' : 'text-sunrise'} font-medium">{tab.content}</span>
					</SwipeLink>
				</div>
				<ActionButton 
					variant="ghost"
					class="shrink-0 p-2"
					onclick={() => copyToClipboard(tab.prefix + tab.content)}
					ariaLabel={`Copy ${tab.label} link to clipboard`}
				>
				{#if copied}
					<CheckIcon class="text-green-500" />
				{:else}
					<CopyIcon />
				{/if}
				</ActionButton>
			</div>
		{/if}
	{/each}
</div>
