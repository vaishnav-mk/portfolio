<script lang="ts">
	import type { BucketListPendingChange } from '$lib/bucket-list';
	import { fade, fly } from 'svelte/transition';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';

	interface Props {
		pendingChanges: BucketListPendingChange[];
		showPasswordPopup: boolean;
		password: string;
		onCancel: () => void;
		onShowPassword: () => void;
		onSubmit: () => void;
	}

	let {
		pendingChanges,
		showPasswordPopup,
		password = $bindable(''),
		onCancel,
		onShowPassword,
		onSubmit
	}: Props = $props();

	function getChangeDescription(change: BucketListPendingChange, index: number) {
		if (change.type === 'toggle') {
			return `[${index + 1}] Marking "${change.label}" as ${change.checked ? 'completed' : 'incomplete'}`;
		}
		if (change.type === 'delete') return `[${index + 1}] Deleting "${change.label}"`;
		return `[${index + 1}] Adding new item "${change.label}"`;
	}
</script>

<div class="fixed bottom-0 left-0 right-0 bg-oc-bg-alt border-t border-oc-border p-4 md:p-5 z-50" transition:fly={{ y: 24, duration: 180 }}>
	<div class="max-w-[900px] mx-auto">
		{#if !showPasswordPopup}
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4" transition:fade={{ duration: 120 }}>
				<div class="flex items-center gap-3 md:gap-4">
					<span class="text-sunrise font-mono">{pendingChanges.length}</span>
					<span class="text-oc-text">pending change{pendingChanges.length > 1 ? 's' : ''}</span>
				</div>
				<div class="flex items-center gap-3 md:gap-4">
					<ActionButton variant="secondary" onclick={onCancel}>Cancel</ActionButton>
					<ActionButton onclick={onShowPassword}>Save Changes</ActionButton>
				</div>
			</div>
		{:else}
			<div class="space-y-4" transition:fade={{ duration: 120 }}>
				<div class="flex justify-between items-center">
					<p class="text-oc-text-bright font-medium">Confirm changes</p>
					<span class="text-oc-text-muted">{pendingChanges.length} change{pendingChanges.length > 1 ? 's' : ''}</span>
				</div>
				
				<div class="max-h-28 overflow-y-auto bg-oc-bg border border-oc-border p-4 text-oc-text-muted">
					{#each pendingChanges as change, index}
						<div class="py-1">
							{getChangeDescription(change, index)}
						</div>
					{/each}
				</div>
				
				<div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
					<label for="bucket-password" class="sr-only">Password</label>
					<input
						id="bucket-password"
						type="password"
						placeholder="Password"
						bind:value={password}
						class="flex-1 bg-oc-bg text-oc-text-bright border border-oc-border px-4 py-2.5 focus:border-sunrise focus:outline-hidden transition-colors"
						onkeydown={(e) => e.key === 'Enter' && onSubmit()}
					/>
					<ActionButton onclick={onSubmit}>Save All</ActionButton>
					<ActionButton variant="secondary" onclick={onCancel}>Cancel</ActionButton>
				</div>
			</div>
		{/if}
	</div>
</div>
