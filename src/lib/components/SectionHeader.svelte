<script lang="ts">
	import type { Snippet } from 'svelte';
	
	interface Props {
		title: string;
		description?: string;
		children?: Snippet;
	}
	
	let { title, description, children }: Props = $props();
</script>

<div class="px-6 py-8 bg-oc-bg-alt border-b border-oc-border">
	<h2 class="text-lg md:text-xl text-oc-text-bright font-medium mb-3">{title}</h2>
	{#if description}
		<p class="text-oc-text">
			<span class="text-sunrise">[*]</span> {description}
		</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
