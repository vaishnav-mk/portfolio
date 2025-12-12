<script lang="ts">
  import { viewingState } from '../store.svelte';
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
      <article class="experience-card p-4 md:p-6 bg-dusk transition-all duration-300 hover:-translate-x-2 first:rounded-t-lg last:rounded-b-lg">
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
          <p class="text-sm text-zenith">{experience.location} — {experience.date}</p>
          {#if highlights.length > 0}
            <ul class="pl-5 space-y-2 mt-4 list-disc marker:text-sunrise">
              {#each initialHighlights as highlight}
                <li class="text-md">{highlight}</li>
              {/each}
              {#if hasMore}
                <li>
                  <button
                    class="show-more-button text-sm text-sunrise hover:text-zenith transition-colors duration-300 uppercase tracking-widest"
                    onclick={() => toggleHighlights(expIndex)}
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                  <ul class="additional-highlights pl-5 space-y-2 mt-2 list-disc marker:text-sunrise" class:hidden={!isExpanded} style="max-height: {isExpanded ? 'none' : '0'}">
                    {#each highlights.slice(3) as highlight}
                      <li class="text-md">{highlight}</li>
                    {/each}
                  </ul>
                </li>
              {/if}
            </ul>
          {/if}
        </div>
      </article>
    {/each}
  </div>
</section>
