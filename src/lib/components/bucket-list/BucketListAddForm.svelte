<script lang="ts">
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		newItemLabel: string;
		newItemInfo: string;
		onAdd: () => void;
	}

	let { newItemLabel = $bindable(''), newItemInfo = $bindable(''), onAdd }: Props = $props();
</script>

<div class="mt-5 p-4 md:mt-6 md:p-5 border border-oc-border bg-oc-bg space-y-4" transition:slide={{ duration: 180 }}>
	<div>
		<label for="newItemLabel" class="block text-oc-text-muted mb-2">Item:</label>
		<input
			id="newItemLabel"
			type="text"
			placeholder="What do you want to achieve?"
			bind:value={newItemLabel}
			class="w-full bg-oc-bg text-oc-text-bright border border-oc-border px-4 py-2.5 focus:border-sunrise focus:outline-hidden transition-colors"
			onkeydown={(e) => e.key === 'Enter' && onAdd()}
		/>
	</div>
	<div>
		<label for="newItemInfo" class="block text-oc-text-muted mb-2">Details:</label>
		<input
			id="newItemInfo"
			type="text"
			placeholder="Any additional details"
			bind:value={newItemInfo}
			class="w-full bg-oc-bg text-oc-text-bright border border-oc-border px-4 py-2.5 focus:border-sunrise focus:outline-hidden transition-colors"
			onkeydown={(e) => e.key === 'Enter' && onAdd()}
		/>
	</div>
	<ActionButton onclick={onAdd}>Add to Bucket List</ActionButton>
</div>
