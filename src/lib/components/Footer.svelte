<script lang="ts">
	const currentYear = new Date().getFullYear();
	const email = 'vaishnavmk.work@gmail.com';
	
	const footerLinks = [
		{ label: 'GitHub', href: 'https://github.com/vaishnav-mk' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/vaishnav-mk' },
		{ label: 'Twitter', href: 'https://twitter.com/wishee0' },
		{ label: 'Medium', href: 'https://medium.com/@wishee' },
		{ label: 'Email', href: `mailto:${email}` }
	];
</script>

<footer>
	<div class="grid grid-cols-2 md:grid-cols-5 border-t border-oc-border">
		{#each footerLinks as link, i}
			<a 
				href={link.href}
				target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
				rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
				class="px-6 py-3 text-oc-text hover:text-sunrise hover:bg-oc-bg-alt transition-colors text-center border-b md:border-b-0 border-r border-oc-border last:border-r-0"
			>
				{link.label}
			</a>
		{/each}
	</div>
	
	<div class="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-oc-text-muted border-t border-oc-border">
		<p>© {currentYear} Vaishnav Manoj</p>
		<div class="flex items-center gap-6">
			<a 
				href="/bl"
				class="hover:text-sunrise transition-colors"
			>
				Bucket List
			</a>
		</div>
	</div>
</footer>
