<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-6">
	<div class="text-center">
		<!-- Error Code -->
		<h1 class="text-7xl md:text-9xl font-normal text-[#333333] mb-4">
			{$page.status || 404}
		</h1>
		
		<!-- Error Message -->
		<h2 class="text-xl md:text-2xl text-[#e5e5e5] mb-4">
			{$page.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
		</h2>
		
		<p class="text-sm text-[#8e8b8b] mb-8 max-w-md mx-auto">
			{$page.error?.message || 'The page you are looking for does not exist.'}
		</p>
		
		<!-- Back Home Button -->
		<a 
			href="/"
			class="inline-flex items-center gap-2 px-4 py-2 border border-[#333333] text-sm text-[#e5e5e5] hover:bg-[#242424] hover:border-[#444444] transition-colors"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="square" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			<span>Back to Home</span>
		</a>
	</div>
</div>
