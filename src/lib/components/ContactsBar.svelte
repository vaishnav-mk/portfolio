<script lang="ts">
	interface Props {
		email: string;
	}
	
	let { email }: Props = $props();
	
	let activeTab = $state('email');
	let copied = $state(false);
	
	const tabs = [
		{ id: 'email', label: 'email', content: email, prefix: 'mailto:' },
		{ id: 'github', label: 'github', content: 'github.com/vaishnav-mk', prefix: 'https://' },
		{ id: 'linkedin', label: 'linkedin', content: 'linkedin.com/in/vaishnav-mk', prefix: 'https://' },
		{ id: 'twitter', label: 'twitter', content: 'x.com/wishee0', prefix: 'https://', isActive: true },
		{ id: 'medium', label: 'medium', content: 'medium.com/@wishee', prefix: 'https://' },
		{ id: 'resume', label: 'resume', content: 'drive.google.com/file/d/1Vah8_QZrO2JGBBz2ZQD_zcXtJ_MuYJRn/view', prefix: 'https://' },
	];
	
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => copied = false, 1500);
	}
</script>

<div class="border-t border-b border-oc-border">
	<div class="flex items-stretch border-b border-oc-border bg-oc-bg-alt">
		{#each tabs as tab}
			<button
				class="px-5 py-3 text-[13px] bg-transparent border-b-2 -mb-px transition-all duration-150 inline-flex items-center gap-2 whitespace-nowrap
					{activeTab === tab.id 
						? tab.id === 'twitter'
							? 'text-oc-text-bright border-[#1d9bf0]' 
							: 'text-oc-text-bright border-sunrise'
						: 'text-oc-text-muted border-transparent hover:text-oc-text'}"
				onclick={() => activeTab = tab.id}
			>
				<span class="{tab.id === 'twitter' ? 'text-[#1d9bf0] font-semibold' : ''}">{tab.label}</span>
				{#if tab.isActive}
					<span class="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 bg-[#1d9bf0] text-white leading-none">active</span>
				{/if}
			</button>
		{/each}
	</div>
	
	{#each tabs as tab}
		{#if activeTab === tab.id}
			<div class="px-5 py-3.5 flex items-center justify-between gap-4 bg-oc-bg">
				<a 
					href="{tab.prefix}{tab.content}"
					target={tab.id === 'email' ? '_self' : '_blank'}
					rel={tab.id === 'email' ? '' : 'noopener noreferrer'}
					class="font-mono text-[13px] text-oc-text hover:text-sunrise transition-colors duration-150"
				>
					<span class="text-oc-text-muted">{tab.prefix}</span><span class="{tab.id === 'twitter' ? 'text-[#1d9bf0]' : 'text-sunrise'} font-medium">{tab.content}</span>
				</a>
				<button 
					class="flex-shrink-0 p-2 text-oc-text-muted hover:text-sunrise transition-colors duration-150"
					onclick={() => copyToClipboard(tab.prefix + tab.content)}
					aria-label="Copy to clipboard"
				>
					{#if copied}
						<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
					{:else}
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="square" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					{/if}
				</button>
			</div>
		{/if}
	{/each}
</div>
