<script lang="ts">
  import { formatDistanceToNow } from 'date-fns';
  import bucketListData from '../../bucketlist.json';
  import image from '$lib/assets/trip.jpeg';
  import { onMount } from 'svelte';

  const { metadata, bucketListItems: bucketListItemsData } = bucketListData;
  const { startDate, birthDate: birthDateStr, averageLifeExpectancy, quote, location, inspirationLink } = metadata;

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
    const ageInYears = diff / millisecondsPerYear;
    return ageInYears;
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
    } else {
      if (originalItem.checked !== item.checked) {
        pendingChanges = [...pendingChanges, {
          type: 'toggle',
          id: item.id,
          checked: item.checked,
          label: item.label
        }];
      }
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
    } else if (change.type === 'delete') {
      return `[${index + 1}] Deleting "${change.label}"`;
    } else if (change.type === 'add') {
      return `[${index + 1}] Adding new item "${change.label}"`;
    }
    return '';
  }
</script>

<svelte:head>
  <title>~vm | Bucket List</title>
</svelte:head>

<main class="min-h-screen bg-night px-4 py-6 md:px-8 md:py-8 pb-24">
  <div class="max-w-3xl mx-auto">
    <div class="bg-night/80 backdrop-blur-sm rounded-lg mb-4 z-10 drop-shadow-3xl pb-4 shadow-xl mt-4 md:sticky md:top-0">
      <div class="flex flex-col space-y-4">
        <div class="flex items-center justify-between">
          <div class="w-full">
            <h1 class="text-2xl md:text-3xl font-bold text-zenith">Bucket List</h1>
            <p class="text-sm text-dawn mt-3 mb-2">
              I'm <span class="text-sunrise font-mono">{currentAge.toFixed(9)}</span> years old (<span class="text-sunrise font-mono">{lifePercentage.toFixed(9)}</span>% of my life finished, based on the average life expectancy of 72.48 years). I created this bucket list to track my goals and aspirations, ensuring I make the most of my time and experiences.
            </p>
            <div class="mt-4 mb-4">
              <div class="relative rounded-lg overflow-hidden h-48 sm:h-64 w-full border-2 border-sunrise group cursor-pointer">
                <img src={image} alt="Trip" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <a href={location.mapLink} target="_blank" rel="noopener noreferrer" class="absolute bottom-3 right-3 flex items-center space-x-2 text-sm bg-sunrise/90 text-night px-3 py-1.5 rounded-md hover:bg-zenith transition-colors duration-300 backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="font-mono">{location.name}</span>
                </a>
              </div>
              <p class="text-sm text-dawn mt-3">
                "{quote}"
              </p>
            </div>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mt-3 space-y-2 md:space-y-0 md:space-x-3 w-full text-sm">
              <p class="text-dawn flex items-center">
                Started
                <span class="text-sunrise font-mono cursor-help border-b border-dotted border-sunrise ml-1" title="on my 21st birthday">
                  {startDate} (age 21)
                </span>
              </p>
              <span class="text-dawn hidden md:flex items-center">•</span>
              <a href={inspirationLink} target="_blank" rel="noopener noreferrer" class="text-sunrise hover:text-zenith transition-colors duration-300 flex items-center space-x-1">
                <span>The ultimate list (Inspiration)</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span class="text-dawn hidden md:flex items-center">•</span>
              <p class="text-dawn flex items-center">
                Ends
                <span class="text-sunrise font-mono cursor-help border-b border-dotted border-sunrise ml-1" title="on my 31st birthday">
                  {timeLeft} (age 31)
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <div class="w-full bg-dusk h-2 rounded-full">
              <div class="bg-sunrise h-full rounded-full transition-all duration-500" style="width: {progressPercentage}%"></div>
            </div>
          </div>
          <span class="text-sunrise font-mono text-sm">
            {completedCount}/{totalCount} completed
          </span>
        </div>
        <div class="flex justify-between items-center">
          <button
            onclick={() => showPasswordPopup = true}
            class="bg-dusk/50 text-dawn py-1 px-3 rounded-lg hover:bg-sunrise hover:text-night transition-colors duration-300 text-sm {hasPendingChanges ? 'bg-sunrise text-night' : ''}"
            class:hidden={!hasPendingChanges}
          >
            Save Changes ({pendingChanges.length})
          </button>
          <button
            onclick={() => showAddForm = !showAddForm}
            class="bg-sunrise text-night py-1 px-3 rounded-lg hover:bg-zenith transition-colors duration-300 text-sm ml-auto"
          >
            {showAddForm ? 'Cancel' : '+ Add New'}
          </button>
        </div>
        {#if showAddForm}
          <div class="bg-dusk/30 p-4 rounded-lg space-y-3">
            <div>
              <label for="newItemLabel" class="block text-sm text-dawn mb-1">Item:</label>
              <input
                id="newItemLabel"
                type="text"
                placeholder="What do you want to achieve?"
                bind:value={newItemLabel}
                class="w-full bg-night text-zenith border border-dusk rounded-lg px-3 py-2"
                onkeydown={(e) => e.key === 'Enter' && addItem()}
              />
            </div>
            <div>
              <label for="newItemInfo" class="block text-sm text-dawn mb-1">Details:</label>
              <input
                id="newItemInfo"
                type="text"
                placeholder="Any additional details"
                bind:value={newItemInfo}
                class="w-full bg-night text-zenith border border-dusk rounded-lg px-3 py-2"
                onkeydown={(e) => e.key === 'Enter' && addItem()}
              />
            </div>
            <button
              onclick={addItem}
              class="bg-sunrise text-night py-2 px-4 rounded-lg hover:bg-zenith transition-colors duration-300"
            >
              Add to Bucket List
            </button>
          </div>
        {/if}
      </div>
    </div>

    <div class="space-y-2">
      {#each bucketListItems as item}
        <div class="flex items-center">
          <label class="block cursor-pointer grow">
            <div class="group bg-dusk/30 hover:bg-dusk/50 rounded-lg px-4 py-3 transition-all duration-300 hover:-translate-x-2">
              <div class="flex items-center space-x-3">
                <div class="custom-checkbox-container">
                  <input
                    type="checkbox"
                    bind:checked={item.checked}
                    onchange={() => toggleItem(item)}
                    class="custom-checkbox-input"
                    id={`checkbox-${item.id}`}
                  />
                  <label for={`checkbox-${item.id}`} class="custom-checkbox-label">
                    {#if item.checked}
                      <svg class="custom-checkbox-checkmark" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z" fill="white"/>
                      </svg>
                    {/if}
                  </label>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 min-w-0 text-sm">
                  <span class={`text-zenith ${item.checked ? 'line-through opacity-50' : ''}`}>
                    {item.label}
                  </span>
                  <span class="text-dawn opacity-50 text-xs hidden sm:inline">•</span>
                  <span class={`text-xs text-dawn ${item.checked ? 'line-through opacity-50' : ''}`}>
                    {item.info}
                  </span>
                </div>
              </div>
            </div>
          </label>
          <button
            onclick={() => deleteItem(item)}
            class="delete-button ml-2 p-2 text-dawn hover:text-sunrise transition-colors flex items-center justify-center"
            title="Delete item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  </div>

  {#if showPasswordPopup}
    <div class="fixed bottom-0 left-0 right-0 bg-dusk/95 backdrop-blur-sm p-4 shadow-xl flex flex-col items-start z-20 w-full transition-all duration-300 border-t border-sunrise/30">
      <div class="max-w-3xl mx-auto w-full">
        <div class="flex justify-between items-center mb-3">
          <p class="text-zenith text-sm font-medium">Please confirm changes</p>
          <div class="text-xs text-dawn bg-night/50 px-2 py-1 rounded-md">
            <span>{pendingChanges.length} pending change{pendingChanges.length > 1 ? 's' : ''}</span>
          </div>
        </div>
        <div class="max-h-32 overflow-y-auto bg-night/40 rounded-lg p-2 mb-3 text-xs text-dawn">
          {#if pendingChanges.length > 0}
            {#each pendingChanges as change, index}
              <div class="py-1 border-b border-dusk/30">
                {getChangeDescription(change, index)}
              </div>
            {/each}
          {:else}
            <div class="text-center text-dawn/50 italic">No pending changes</div>
          {/if}
        </div>
        <div class="flex w-full space-x-2">
          <input
            type="password"
            placeholder="Password"
            bind:value={password}
            class="grow bg-night/80 text-zenith border border-dawn/30 rounded-lg px-3 py-2 text-sm focus:border-sunrise focus:outline-none transition-colors duration-300"
            onkeydown={(e) => e.key === 'Enter' && submitChanges()}
          />
          <button
            onclick={submitChanges}
            class="bg-sunrise text-night px-4 py-2 rounded-lg text-sm hover:bg-zenith transition-colors duration-300 font-medium"
          >
            Save All
          </button>
          <button
            onclick={cancelChanges}
            class="bg-night/50 border border-dawn/30 text-dawn px-4 py-2 rounded-lg text-sm hover:border-sunrise hover:text-sunrise transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>
