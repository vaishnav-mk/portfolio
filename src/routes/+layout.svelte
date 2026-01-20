<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>~/vm: Vaishnav Manoj</title>
	<meta name="description" content="Developer and researcher passionate about scalable systems, cloud infrastructure, and quantum computing." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-[#1a1a1a] text-[#e5e5e5]" style="font-family: 'JetBrains Mono', monospace;">
	{@render children()}
</div>
