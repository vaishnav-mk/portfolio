<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import BucketListAddForm from '$lib/components/bucket-list/BucketListAddForm.svelte';
	import BucketListIntro from '$lib/components/bucket-list/BucketListIntro.svelte';
	import BucketListItems from '$lib/components/bucket-list/BucketListItems.svelte';
	import PendingChangesBar from '$lib/components/bucket-list/PendingChangesBar.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { formatDistanceToDate } from '$lib/utils/date';
	import type { PageData } from './$types';
	import type { BucketListItem, BucketListPendingChange } from '$lib/bucket-list';

	let { data }: { data: PageData } = $props();

	let startDate = $derived(data.metadata.startDate);
	let birthDate = $derived(new Date(data.metadata.birthDate));
	let averageLifeExpectancy = $derived(data.metadata.averageLifeExpectancy);
	let quote = $derived(data.metadata.quote);
	let location = $derived(data.metadata.location);
	let inspirationLink = $derived(data.metadata.inspirationLink);
	let futureDate = $derived.by(() => {
		const d = new Date(startDate);
		d.setFullYear(d.getFullYear() + 10);
		return d;
	});

	function deepClone<T>(value: T): T {
		return JSON.parse(JSON.stringify(value));
	}

	function getInitialItems() {
		return deepClone(data.bucketListItems);
	}

	let bucketListItems = $state<BucketListItem[]>(getInitialItems());
	let originalItems = $state<BucketListItem[]>(getInitialItems());
	let pendingChanges = $state<BucketListPendingChange[]>([]);
	let nextTempId = -1;

	let showAddForm = $state(false);
	let showPasswordPopup = $state(false);
	let password = $state('');
	let newItemLabel = $state('');
	let newItemInfo = $state('');
	let currentAge = $state(untrack(calculateAge));
	let lifePercentage = $state(untrack(() => calculateLifePercentage(currentAge)));
	let timeLeft = $state(untrack(() => formatDistanceToDate(futureDate)));
	let toast = $state<{ message: string; type: 'success' | 'error' } | null>(null);
	let toastTimer: ReturnType<typeof setTimeout>;

	function showToast(message: string, type: 'success' | 'error') {
		clearTimeout(toastTimer);
		toast = { message, type };
		toastTimer = setTimeout(() => { toast = null; }, 4000);
	}

	function calculateAge() {
		const now = new Date();
		const diff = now.getTime() - birthDate.getTime();
		const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
		return diff / millisecondsPerYear;
	}

	function calculateLifePercentage(age: number) {
		return (age / averageLifeExpectancy) * 100;
	}

	function updateLifeStats() {
		currentAge = calculateAge();
		lifePercentage = calculateLifePercentage(currentAge);
		timeLeft = formatDistanceToDate(futureDate);
	}

	onMount(() => {
		let raf: number;
		function tick() {
			updateLifeStats();
			raf = requestAnimationFrame(tick);
		}
		tick();

		return () => cancelAnimationFrame(raf);
	});

	let completedCount = $derived(bucketListItems.filter((item) => item.checked).length);
	let totalCount = $derived(bucketListItems.length);
	let progressPercentage = $derived(totalCount > 0 ? (completedCount / totalCount) * 100 : 0);
	let hasPendingChanges = $derived(pendingChanges.length > 0);

	function toggleItem(item: BucketListItem, checked: boolean) {
		item.checked = checked;

		const originalItem = originalItems.find((orig) => orig.id === item.id);
		if (!originalItem) return;

		const existingChangeIndex = pendingChanges.findIndex(
			(change) => change.type === 'toggle' && change.id === item.id
		);

		if (existingChangeIndex !== -1) {
			if (originalItem.checked === item.checked) {
				pendingChanges = pendingChanges.filter((_, idx) => idx !== existingChangeIndex);
			} else {
				pendingChanges = pendingChanges.map((change, idx) =>
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

	function deleteItem(item: BucketListItem) {
		const addIndex = pendingChanges.findIndex(
			(change) => change.type === 'add' && change.tempId === item.id
		);

		if (addIndex !== -1) {
			pendingChanges = pendingChanges.filter((_, idx) => idx !== addIndex);
			bucketListItems = bucketListItems.filter((i) => i.id !== item.id);
		} else {
			const existingChangeIndex = pendingChanges.findIndex(
				(change) => change.type === 'delete' && change.id === item.id
			);
			if (existingChangeIndex === -1) {
				pendingChanges = [...pendingChanges, { type: 'delete', id: item.id, label: item.label }];
				bucketListItems = bucketListItems.filter((i) => i.id !== item.id);
			}
		}
	}

	function addItem() {
		if (!newItemLabel.trim()) return;

		const tempId = nextTempId--;
		const newItem: BucketListItem = {
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
		bucketListItems = deepClone(originalItems);
		pendingChanges = [];
		showPasswordPopup = false;
		password = '';
	}

	function itemsForSave() {
		let nextId = Math.max(0, ...bucketListItems.map((item) => item.id)) + 1;
		return bucketListItems.map((item) => ({
			...item,
			id: item.id < 0 ? nextId++ : item.id
		}));
	}

	async function submitChanges() {
		if (!password) return;
		const itemsToSave = itemsForSave();

		try {
			const response = await fetch('/api/bucket-list', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password, bucketListItems: itemsToSave })
			});

			const responseData = await response.json() as { error?: string };

			if (!response.ok) {
				const msg = response.status === 403 ? 'nice try.' : (responseData.error || 'something broke.');
				showToast(msg, 'error');
				return;
			}

			bucketListItems = itemsToSave;
			originalItems = deepClone(itemsToSave);
			pendingChanges = [];
			showPasswordPopup = false;
			password = '';
			const remaining = bucketListItems.filter((item) => !item.checked).length;
			showToast(`hell yeah, another one. ${remaining} more to go.`, 'success');
		} catch (err) {
			console.error('Error submitting changes:', err);
			showToast(err instanceof Error ? err.message : 'Failed to save changes', 'error');
		}
	}

</script>

<Seo
	title="~/vm | Bucket List"
	description="My personal bucket list - goals, dreams, and adventures I want to experience."
	image="/og.svg?title=Bucket%20List&description=40%20things%20before%20the%20clock%20runs%20out"
	imageAlt="Vaishnav Manoj bucket list card"
/>

<svelte:head>
	<link
		rel="preload"
		as="image"
		href="/trip2-480.avif"
		imagesrcset="/trip2-480.avif 480w"
		imagesizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 180px"
		fetchpriority="high"
		type="image/avif"
	/>
</svelte:head>

<section class="border-b border-oc-border bg-[radial-gradient(circle_at_top_left,rgba(255,166,158,0.08),transparent_35%),var(--color-oc-bg-alt)] px-4 py-6 md:px-6 md:py-12">
	<BucketListIntro
		{startDate}
		{averageLifeExpectancy}
		{quote}
		{location}
		{inspirationLink}
		{currentAge}
		{lifePercentage}
		{timeLeft}
		{progressPercentage}
		{completedCount}
		{totalCount}
		{showAddForm}
		onToggleAddForm={() => showAddForm = !showAddForm}
	/>

	{#if showAddForm}
		<BucketListAddForm bind:newItemLabel bind:newItemInfo onAdd={addItem} />
	{/if}
</section>

<BucketListItems items={bucketListItems} onToggle={toggleItem} onDelete={deleteItem} />

{#if hasPendingChanges}
	<div class="h-24 md:h-20"></div>
	<PendingChangesBar
		{pendingChanges}
		{showPasswordPopup}
		bind:password
		onCancel={cancelChanges}
		onShowPassword={() => showPasswordPopup = true}
		onSubmit={submitChanges}
	/>
{/if}

{#if toast}
	<div
		class="fixed top-4 right-4 z-[60] border px-4 py-3 text-sm font-medium transition-opacity {toast.type === 'success' ? 'border-green-800 bg-green-950 text-green-300' : 'border-red-800 bg-red-950 text-red-300'}"
		role="status"
		aria-live="polite"
	>
		{toast.message}
	</div>
{/if}
