<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'plain';

	interface Props {
		children: Snippet;
		id?: string;
		variant?: Variant;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		onclick?: (event: MouseEvent) => void;
		disabled?: boolean;
		ariaLabel?: string;
		ariaExpanded?: boolean;
		ariaControls?: string;
	}

	let {
		children,
		id,
		variant = 'primary',
		type = 'button',
		class: className = '',
		onclick,
		disabled = false,
		ariaLabel,
		ariaExpanded,
		ariaControls
	}: Props = $props();

	const variants = {
		primary: 'border border-oc-border bg-oc-bg text-oc-text-bright font-semibold hover:border-sunrise/60 hover:bg-sunrise/10 focus-visible:border-sunrise/60 focus-visible:bg-sunrise/10',
		secondary: 'border border-oc-border bg-transparent text-oc-text hover:border-oc-text hover:text-oc-text-bright focus-visible:border-oc-text focus-visible:text-oc-text-bright',
		ghost: 'border border-transparent text-oc-text hover:bg-sunrise/10 hover:text-oc-text-bright focus-visible:bg-sunrise/10 focus-visible:text-oc-text-bright',
		plain: 'text-inherit hover:bg-oc-bg-alt focus-visible:bg-oc-bg-alt'
	};
</script>

<button
	{id}
	{type}
	{onclick}
	{disabled}
	aria-label={ariaLabel}
	aria-expanded={ariaExpanded}
	aria-controls={ariaControls}
	class="inline-flex min-h-12 items-center gap-3 px-5 py-3 transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 {variants[variant]} {className}"
>
	{@render children()}
</button>
