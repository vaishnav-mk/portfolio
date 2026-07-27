<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<span
	aria-hidden="true"
	class="pointer-events-none h-2 w-2 border-t border-r border-sunrise/80 opacity-60 transition-[opacity,transform] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-100 {className}"
></span>
