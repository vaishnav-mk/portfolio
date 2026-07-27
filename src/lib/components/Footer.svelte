<script lang="ts">
	import SwipeLink from '$lib/components/ui/SwipeLink.svelte';
	import ExternalCorner from '$lib/components/ui/ExternalCorner.svelte';
	import type { SocialLink } from '$lib/types';

	interface Props {
		name: string;
		email: string;
		socialLinks: SocialLink[];
	}

	let { name, email, socialLinks }: Props = $props();

	const currentYear = new Date().getFullYear();
	
	let footerLinks = $derived([
		...socialLinks.map((l) => ({ label: l.label, href: l.href })),
		{ label: 'Email', href: `mailto:${email}` }
	]);
</script>

<footer>
	<div class="mt-4 grid grid-cols-2 divide-x divide-y divide-oc-border border-t border-b border-oc-border md:mt-8 md:grid-cols-5 md:divide-y-0 [&>:last-child:nth-child(odd)]:col-span-2 md:[&>:last-child:nth-child(odd)]:col-span-1">
		{#each footerLinks as link}
			<a 
				href={link.href}
				target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
				rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
				class="group relative flex min-h-12 w-full items-center justify-center px-4 py-3 text-center text-oc-text transition-colors hover:bg-oc-bg-alt hover:text-sunrise focus-visible:bg-oc-bg-alt focus-visible:text-sunrise md:px-6"
				aria-label={link.href.startsWith('mailto:') ? `Email ${name}` : `Open ${name} on ${link.label}`}
			>
				{link.label}
				{#if !link.href.startsWith('mailto:')}
					<ExternalCorner class="absolute right-3 top-3" />
				{/if}
			</a>
		{/each}
	</div>
	
	<div class="px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-oc-text-muted md:px-6 md:py-5">
		<p>&copy; {currentYear} {name}</p>
		<div class="flex items-center gap-6">
			<SwipeLink 
				href="/bl"
				variant="inline"
				class="text-oc-text"
			>
				<span>Bucket List</span>
				<span aria-hidden="true">&rarr;</span>
			</SwipeLink>
		</div>
	</div>
</footer>
