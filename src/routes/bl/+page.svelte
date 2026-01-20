<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import bucketListData from '../../bucketlist.json';
	import image from '$lib/assets/trip.jpeg';
	import { onMount } from 'svelte';

	const { metadata, bucketListItems: bucketListItemsData } = bucketListData;
	const {
		startDate,
		birthDate: birthDateStr,
		averageLifeExpectancy,
		quote,
		location,
		inspirationLink
	} = metadata;

	const birthDate = new Date(birthDateStr);
	const futureDate = new Date(startDate);
	futureDate.setFullYear(futureDate.getFullYear() + 10);
	const timeLeft = formatDistanceToNow(futureDate, { addSuffix: true });

	let bucketListItems = $state([...bucketListItemsData]);
	let originalItems = $state(JSON.parse(JSON.stringify(bucketListItemsData)));
	let pendingChanges = $state<any[]>([]);

	let showAddForm = $state(false);
	let showPasswordPopup = $state(false);
	let password = $state('');
	let newItemLabel = $state('');
	let newItemInfo = $state('');
	let currentAge = $state(0);
	let lifePercentage = $state(0);

	function calculateAge() {
		const now = new Date();
		const diff = now.getTime() - birthDate.getTime();
		const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
		return diff / millisecondsPerYear;
	}

	function calculateLifePercentage(age: number) {
		return (age / averageLifeExpectancy) * 100;
	}

	onMount(() => {
		currentAge = calculateAge();
		lifePercentage = calculateLifePercentage(currentAge);
		const interval = setInterval(() => {
			currentAge = calculateAge();
			lifePercentage = calculateLifePercentage(currentAge);
		}, 100);

		return () => clearInterval(interval);
	});

	let completedCount = $derived(bucketListItems.filter((item: any) => item.checked).length);
	let totalCount = $derived(bucketListItems.length);
	let progressPercentage = $derived(totalCount > 0 ? (completedCount / totalCount) * 100 : 0);
	let hasPendingChanges = $derived(pendingChanges.length > 0);

	function toggleItem(item: any) {
		const originalItem = originalItems.find((orig: any) => orig.id === item.id);
		if (!originalItem) return;

		const existingChangeIndex = pendingChanges.findIndex(
			(change: any) => change.type === 'toggle' && change.id === item.id
		);

		if (existingChangeIndex !== -1) {
			if (originalItem.checked === item.checked) {
				pendingChanges = pendingChanges.filter((_: any, idx: number) => idx !== existingChangeIndex);
			} else {
				pendingChanges = pendingChanges.map((change: any, idx: number) =>
					idx === existingChangeIndex ? { ...change, checked: item.checked } : change
				);
			}
		} else if (originalItem.checked !== item.checked) {
			pendingChanges = [
				...pendingChanges,
				{
					type: 'toggle',
					id: item.id,
					checked: item.checked,
					label: item.label
				}
			];
		}
	}

	function deleteItem(item: any) {
		const addIndex = pendingChanges.findIndex(
			(change: any) => change.type === 'add' && change.tempId === item.id
		);

		if (addIndex !== -1) {
			pendingChanges = pendingChanges.filter((_: any, idx: number) => idx !== addIndex);
			bucketListItems = bucketListItems.filter((i: any) => i.id !== item.id);
		} else {
			const existingChangeIndex = pendingChanges.findIndex(
				(change: any) => change.type === 'delete' && change.id === item.id
			);
			if (existingChangeIndex === -1) {
				pendingChanges = [...pendingChanges, { type: 'delete', id: item.id, label: item.label }];
				bucketListItems = bucketListItems.filter((i: any) => i.id !== item.id);
			}
		}
	}

	function addItem() {
		if (!newItemLabel.trim()) return;

		const tempId = -1 * (pendingChanges.filter((c: any) => c.type === 'add').length + 1);
		const newItem = {
			id: tempId,
			label: newItemLabel.trim(),
			info: newItemInfo.trim(),
			checked: false
		};

		bucketListItems = [...bucketListItems, newItem];
		pendingChanges = [...pendingChanges, { type: 'add', tempId, item: newItem, label: newItem.label }];

		newItemLabel = '';
		newItemInfo = '';
		showAddForm = false;
	}

	function cancelChanges() {
		bucketListItems = JSON.parse(JSON.stringify(originalItems));
		pendingChanges = [];
		showPasswordPopup = false;
		password = '';
	}

	async function submitChanges() {
		if (!password) return;

		try {
			const response = await fetch('https://portfolio-backend.wishee.workers.dev', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password, bucketListItems })
			});

			const data = await response.json();

			if (!response.ok) {
				alert(`Error: ${data.error || 'Failed to save changes'}`);
				return;
			}

			originalItems = JSON.parse(JSON.stringify(bucketListItems));
			pendingChanges = [];
			showPasswordPopup = false;
			password = '';
			alert('Success: Changes saved successfully!');
		} catch (error) {
			console.error('Error submitting changes:', error);
			alert('Error: Failed to save changes');
		}
	}

	function getChangeDescription(change: any, index: number): string {
		if (change.type === 'toggle') {
			return `[${index + 1}] Marking "${change.label}" as ${change.checked ? 'completed' : 'incomplete'}`;
		}
		if (change.type === 'delete') {
			return `[${index + 1}] Deleting "${change.label}"`;
		}
		if (change.type === 'add') {
			return `[${index + 1}] Adding new item "${change.label}"`;
		}
		return '';
	}
</script>

<svelte:head>
	<title>~/vm | Bucket List</title>
	<meta name="description" content="My personal bucket list - goals, dreams, and adventures I want to experience." />
</svelte:head>

<section class="px-6 py-10 md:py-12 border-b border-oc-border bg-oc-bg-alt">
	<h1 class="text-2xl md:text-3xl font-medium text-oc-text-bright mb-4">Bucket List</h1>
	
	<p class="text-oc-text mb-6 leading-relaxed">
		I'm <span class="text-sunrise font-mono">{currentAge.toFixed(9)}</span> years old 
		(<span class="text-sunrise font-mono">{lifePercentage.toFixed(6)}%</span> of my life, based on {averageLifeExpectancy} year life expectancy).
	</p>

	<div class="relative overflow-hidden h-48 sm:h-56 w-full border border-oc-border mb-5">
		<img 
			src={image} 
			alt="Trip" 
			class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
		/>
		<a 
			href={location.mapLink} 
			target="_blank" 
			rel="noopener noreferrer" 
			class="absolute bottom-3 right-3 flex items-center gap-2 bg-sunrise text-oc-bg px-3 py-1.5 hover:bg-oc-text-bright transition-colors"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<span class="font-medium">{location.name}</span>
		</a>
	</div>

	<p class="text-oc-text-muted italic mb-6">"{quote}"</p>

	<div class="flex items-center gap-6 mb-6">
		<div class="flex-1">
			<div class="w-full bg-oc-border h-1.5">
				<div class="bg-sunrise h-full transition-all duration-500" style="width: {progressPercentage}%"></div>
			</div>
		</div>
		<span class="text-sunrise font-mono whitespace-nowrap">
			{completedCount}/{totalCount} completed
		</span>
	</div>

	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
		<div class="flex flex-wrap gap-4 text-oc-text-muted">
			<span>Started: <span class="text-sunrise">{startDate}</span></span>
			<span class="hidden md:inline">•</span>
			<span>Ends: <span class="text-sunrise">{timeLeft}</span></span>
			<span class="hidden md:inline">•</span>
			<a href={inspirationLink} target="_blank" rel="noopener noreferrer" class="text-sunrise hover:underline">
				Inspiration →
			</a>
		</div>
		<button
			onclick={() => showAddForm = !showAddForm}
			class="px-4 py-1.5 bg-sunrise text-oc-bg font-medium hover:bg-oc-text-bright transition-colors w-fit"
		>
			{showAddForm ? 'Cancel' : '+ Add New'}
		</button>
	</div>

	{#if showAddForm}
		<div class="mt-6 p-5 border border-oc-border bg-oc-bg space-y-4">
			<div>
				<label for="newItemLabel" class="block text-oc-text-muted mb-2">Item:</label>
				<input
					id="newItemLabel"
					type="text"
					placeholder="What do you want to achieve?"
					bind:value={newItemLabel}
					class="w-full bg-oc-bg text-oc-text-bright border border-oc-border px-4 py-2.5 focus:border-sunrise focus:outline-none transition-colors"
					onkeydown={(e) => e.key === 'Enter' && addItem()}
				/>
			</div>
			<div>
				<label for="newItemInfo" class="block text-oc-text-muted mb-2">Details:</label>
				<input
					id="newItemInfo"
					type="text"
					placeholder="Any additional details"
					bind:value={newItemInfo}
					class="w-full bg-oc-bg text-oc-text-bright border border-oc-border px-4 py-2.5 focus:border-sunrise focus:outline-none transition-colors"
					onkeydown={(e) => e.key === 'Enter' && addItem()}
				/>
			</div>
			<button
				onclick={addItem}
				class="px-5 py-2.5 bg-sunrise text-oc-bg font-medium hover:bg-oc-text-bright transition-colors"
			>
				Add to Bucket List
			</button>
		</div>
	{/if}
</section>

<section class="border-b border-oc-border">
	{#each bucketListItems as item}
		<div class="flex items-center border-b border-oc-border last:border-b-0 transition-colors group {item.checked ? 'bg-oc-bg-alt' : 'hover:bg-oc-bg-alt'}">
			<label class="flex-1 cursor-pointer">
				<div class="px-6 py-4 flex items-center gap-4">
					<input
						type="checkbox"
						bind:checked={item.checked}
						onchange={() => toggleItem(item)}
						class="sr-only"
						id={`checkbox-${item.id}`}
					/>
					<span class="text-sunrise flex-shrink-0 font-mono inline-flex items-center">[<span class="w-[1ch] text-center">{item.checked ? 'x' : ' '}</span>]</span>
					<div class="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
						<span class="{item.checked ? 'line-through text-sunrise/60' : 'text-oc-text-bright'}">
							{item.label}
						</span>
						<span class="text-oc-text-muted hidden sm:inline">•</span>
						<span class="{item.checked ? 'line-through text-sunrise/40' : 'text-oc-text-muted'}">
							{item.info}
						</span>
					</div>
				</div>
			</label>
			<button
				onclick={() => deleteItem(item)}
				class="px-4 py-4 text-oc-text-muted hover:text-sunrise transition-colors opacity-0 group-hover:opacity-100"
				title="Delete item"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</button>
		</div>
	{/each}
</section>

{#if hasPendingChanges}
	<div class="fixed bottom-0 left-0 right-0 bg-oc-bg-alt border-t border-oc-border p-5 z-50">
		<div class="max-w-[900px] mx-auto">
			{#if !showPasswordPopup}
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-4">
						<span class="text-sunrise font-mono">{pendingChanges.length}</span>
						<span class="text-oc-text">pending change{pendingChanges.length > 1 ? 's' : ''}</span>
					</div>
					<div class="flex items-center gap-4">
						<button
							onclick={cancelChanges}
							class="px-4 py-1.5 border border-oc-border text-oc-text hover:border-sunrise hover:text-sunrise transition-colors"
						>
							Cancel
						</button>
						<button
							onclick={() => showPasswordPopup = true}
							class="px-4 py-1.5 bg-sunrise text-oc-bg font-medium hover:bg-oc-text-bright transition-colors"
						>
							Save Changes
						</button>
					</div>
				</div>
			{:else}
				<div class="space-y-4">
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
					
					<div class="flex gap-4">
						<input
							type="password"
							placeholder="Password"
							bind:value={password}
							class="flex-1 bg-oc-bg text-oc-text-bright border border-oc-border px-4 py-2.5 focus:border-sunrise focus:outline-none transition-colors"
							onkeydown={(e) => e.key === 'Enter' && submitChanges()}
						/>
						<button
							onclick={submitChanges}
							class="px-5 py-2.5 bg-sunrise text-oc-bg font-medium hover:bg-oc-text-bright transition-colors"
						>
							Save All
						</button>
						<button
							onclick={cancelChanges}
							class="px-5 py-2.5 border border-oc-border text-oc-text hover:border-sunrise hover:text-sunrise transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
