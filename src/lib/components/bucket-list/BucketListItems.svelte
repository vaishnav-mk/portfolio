<script lang="ts">
	import type { BucketListItem } from '$lib/bucket-list';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import { TrashIcon } from '$lib/components/ui/icons';

	interface Props {
		items: BucketListItem[];
		onToggle: (item: BucketListItem, checked: boolean) => void;
		onDelete: (item: BucketListItem) => void;
	}

	let { items, onToggle, onDelete }: Props = $props();
</script>

<section class="border-t border-b border-oc-border">
	{#each items as item (item.id)}
		<div class="flex items-center border-b border-oc-border last:border-b-0 transition-colors group {item.checked ? 'bg-oc-bg-alt' : 'hover:bg-oc-bg-alt'}">
			<label class="flex-1 cursor-pointer">
				<div class="px-4 py-3.5 md:px-6 md:py-4 flex items-center gap-3 md:gap-4">
					<input
						type="checkbox"
						checked={item.checked}
						onchange={(event) => onToggle(item, event.currentTarget.checked)}
						class="bucket-checkbox mr-3"
						id={`checkbox-${item.id}`}
					/>
					<div class="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
						<span class={item.checked ? 'line-through text-sunrise/80' : 'text-oc-text-bright'}>
							{item.label}
						</span>
						{#if item.info}
							<span class="text-oc-text-muted hidden sm:inline">*</span>
							<span class={item.checked ? 'line-through text-sunrise/70' : 'text-oc-text-muted'}>
								{item.info}
							</span>
						{/if}
					</div>
				</div>
			</label>
			<ActionButton
				variant="ghost"
				onclick={() => onDelete(item)}
				class="px-3 py-3.5 md:px-4 md:py-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100"
				ariaLabel={`Delete ${item.label}`}
			>
				<TrashIcon />
			</ActionButton>
		</div>
	{/each}
</section>
