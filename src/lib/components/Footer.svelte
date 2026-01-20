<script lang="ts">
	import type { SocialLink } from '$lib/types';
	
	interface Props {
		socialLinks: SocialLink[];
		email: string;
	}
	
	let { socialLinks, email }: Props = $props();
	
	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-[#333333] bg-[#1a1a1a]">
	<div class="max-w-[1200px] mx-auto px-6 py-8">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
			<!-- Links -->
			<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
				{#each socialLinks as link}
					<a 
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs text-[#656363] hover:text-[#8e8b8b] transition-colors"
					>
						{link.label}
					</a>
				{/each}
			</div>
			
			<!-- Copyright -->
			<p class="text-xs text-[#656363]">
				© {currentYear} Vaishnav Manoj
			</p>
		</div>
	</div>
</footer>
