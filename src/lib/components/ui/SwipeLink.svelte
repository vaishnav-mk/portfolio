<script lang="ts">
	import type { Snippet } from 'svelte';
	import ExternalCorner from './ExternalCorner.svelte';

	type Variant = 'inline' | 'nav' | 'box' | 'card' | 'icon';

	interface Props {
		children: Snippet;
		href: string;
		variant?: Variant;
		class?: string;
		active?: boolean;
		ariaLabel?: string;
		ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | true;
		target?: '_self' | '_blank' | '_parent' | '_top';
		rel?: string;
		onclick?: (event: MouseEvent) => void;
		arrow?: boolean;
	}

	let {
		children,
		href,
		variant = 'inline',
		class: className = '',
		active = false,
		ariaLabel,
		ariaCurrent,
		target,
		rel,
		onclick,
		arrow = false
	}: Props = $props();

	let isExternal = $derived(/^https?:\/\//.test(href));
	let resolvedTarget = $derived(target ?? (isExternal ? '_blank' : undefined));
	let resolvedRel = $derived(rel ?? (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined));

	const variants = {
		inline: 'min-h-8 py-1.5 pr-5 pl-0 text-oc-text hover:pl-4 focus-visible:pl-4',
		nav: 'min-h-8 py-1.5 pr-3 pl-4 text-oc-text',
		box: 'min-h-8 py-1.5 pr-3 pl-4 text-oc-text',
		card: 'block w-full text-oc-text',
		icon: 'h-8 w-8 p-0 text-oc-text-muted justify-center'
	};

	const contentVariants = {
		inline: 'inline-flex items-center gap-1.5',
		nav: 'inline-flex items-center gap-1.5',
		box: 'inline-flex items-center gap-1.5',
		card: 'block',
		icon: 'inline-flex items-center justify-center gap-1.5'
	};
</script>

<a
	{href}
	target={resolvedTarget}
	rel={resolvedRel}
	aria-label={ariaLabel}
	aria-current={ariaCurrent}
	{onclick}
	class="group relative isolate inline-flex items-center overflow-hidden leading-none transition-[background-color,border-color,color,padding] duration-150 ease-out hover:bg-sunrise/10 hover:text-oc-text-bright focus-visible:bg-sunrise/10 focus-visible:text-oc-text-bright focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-sunrise {variants[variant]} {active ? 'bg-sunrise/10 text-sunrise' : ''} {className}"
>
	<span class="pointer-events-none absolute left-0 top-1.5 bottom-1.5 w-px origin-center scale-y-0 bg-sunrise opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:scale-y-100 group-hover:opacity-100 group-focus-visible:scale-y-100 group-focus-visible:opacity-100 {active ? 'scale-y-100 opacity-100' : ''}"></span>
	<span class="relative z-10 {contentVariants[variant]} {variant === 'nav' ? '' : 'transition-transform duration-150 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1'}">
		{@render children()}
		{#if arrow}
			<span aria-hidden="true">&rarr;</span>
		{/if}
	</span>
	{#if isExternal}
		<ExternalCorner class="absolute right-1 top-1" />
	{/if}
</a>
