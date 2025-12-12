<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { viewingState } from '../store.svelte';
  import { formatDuration } from '../utils';
  import HoverTransform from './HoverTransform.svelte';

  let { experiences } = $props<{ experiences: any[] }>();

  let heading = $state<HTMLElement | null>(null);
  let expandedHighlights = $state<Set<number>>(new Set());
  let isViewingExperiences = $derived(viewingState.value === 'experiences');

  function toggleHighlights(index: number) {
    if (expandedHighlights.has(index)) {
      expandedHighlights.delete(index);
    } else {
      expandedHighlights.add(index);
    }
    expandedHighlights = new Set(expandedHighlights);
  }

  $effect(() => {
    heading = document.getElementById('experience-heading');
  });

  $effect(() => {
    if (!heading) return;
    if (isViewingExperiences) {
      heading.classList.remove('text-zenith', 'line-through');
      heading.classList.add('text-sunrise');
    } else {
      heading.classList.add('text-zenith', 'line-through');
      heading.classList.remove('text-sunrise');
    }
  });
</script>

<section id="experiences" class="space-y-4">
  <h2
    id="experience-heading"
    class="text-xl font-bold tracking-wide uppercase {isViewingExperiences ? 'text-sunrise' : 'text-zenith line-through'}"
  >
    Experience
  </h2>
  <div class="space-y-2">
    {#each experiences as experience, expIndex}
      {@const highlights = experience.highlights || []}
      {@const initialHighlights = highlights.slice(0, 3)}
      {@const hasMore = highlights.length > 3}
      {@const isExpanded = expandedHighlights.has(expIndex)}
      <article class="group experience-card p-4 md:p-6 bg-dusk transition-all duration-300 hover:-translate-x-2 first:rounded-t-lg last:rounded-b-lg">
        <HoverTransform
          primaryText={experience.company}
          secondaryText={experience.companyDescription || experience.company}
          href={experience.companyLink}
          class="text-xs font-bold text-sunrise tracking-widest hover:text-zenith"
          uppercase={true}
          secondaryClassName="text-white"
          allowWrap={true}
        />
        <div class="mt-2">
          <h3 class="text-lg font-semibold text-zenith">{experience.title}</h3>
          <div class="flex justify-between items-center text-sm text-dawn mt-1">
            <span>{experience.location}</span>
            <span class="relative overflow-hidden text-right">
              <span class="inline-block transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">{experience.date}</span>
              <span class="absolute right-0 top-full inline-block transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-100 opacity-0 text-sunrise">{formatDuration(experience.date)}</span>
            </span>
          </div>
          {#if highlights.length > 0}
            <ul class="pl-5 space-y-2 mt-4 list-disc marker:text-sunrise">
              {#each initialHighlights as highlight}
                <li class="text-md">{highlight}</li>
              {/each}
            </ul>

            {#if isExpanded}
              <div transition:slide={{ duration: 300, easing: cubicOut }}>
                <ul class="pl-5 space-y-2 mt-2 list-disc marker:text-sunrise">
                  {#each highlights.slice(3) as highlight}
                    <li class="text-md">{highlight}</li>
                  {/each}
                </ul>
              </div>
            {/if}

            {#if hasMore}
              <button
                class="group flex items-center gap-3 mt-4 text-xs text-dawn/60 hover:text-sunrise transition-all duration-300"
                onclick={() => toggleHighlights(expIndex)}
              >
                <span class="h-px w-8 bg-dawn/30 group-hover:w-12 group-hover:bg-sunrise transition-all duration-300"></span>
                <span class="uppercase tracking-widest font-medium">{isExpanded ? 'Show Less' : 'Show More'}</span>
                <svg
                  class="w-3 h-3 transition-transform duration-300"
                  class:rotate-180={isExpanded}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            {/if}
          {/if}
        </div>
      </article>
    {/each}
  </div>
</section>
