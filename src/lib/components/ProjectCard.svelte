<script lang="ts">
  let { project, index, totalProjects, layout } = $props<{
    project: any;
    index: number;
    totalProjects: number;
    layout: 'left' | 'right';
  }>();

  const hasSource = Boolean(project.source);
  const hasVisit = Boolean(project.visit);

  function getRoundedClass() {
    if (index === 0) return 'rounded-tl-lg';
    if (index === 1) return 'rounded-tr-lg';
    if (index === totalProjects - 2) return 'rounded-bl-lg';
    if (index === totalProjects - 1) return 'rounded-br-lg';
    return '';
  }

  const hoverDirection = layout === 'right' ? 'hover:translate-x-2' : 'hover:-translate-x-2';
</script>

<article class="flex bg-dusk p-4 mb-2 transition-transform duration-300 {hoverDirection} {getRoundedClass()}">
  <div class="flex flex-col justify-between flex-1 min-w-0">
    <div>
      <p class="text-xs font-bold uppercase text-zenith">{project.tech}</p>
      <p class="mt-2 opacity-50 text-sm">{project.description.slice(0, 80)}</p>
    </div>
    <h3 class="mt-4 font-bold tracking-widest text-sunrise text-base">{project.title}</h3>
  </div>

  <div class="flex flex-col gap-4 ml-4">
    {#if hasSource}
      <a
        href={project.source}
        target="_blank"
        rel="noopener noreferrer"
        class="[writing-mode:vertical-rl] text-xs font-semibold text-zenith hover:text-sunrise hover:-translate-y-1 transition-all duration-300"
      >
        ↗ Source
      </a>
    {:else}
      <span class="[writing-mode:vertical-rl] text-xs font-semibold text-dawn/30 line-through">↗ Source</span>
    {/if}

    {#if hasVisit}
      <a
        href={project.visit}
        target="_blank"
        rel="noopener noreferrer"
        class="[writing-mode:vertical-rl] text-xs font-semibold text-zenith hover:text-sunrise hover:translate-y-1 transition-all duration-300"
      >
        ↗ Visit
      </a>
    {:else}
      <span class="[writing-mode:vertical-rl] text-xs font-semibold text-dawn/30 line-through">↗ Visit</span>
    {/if}
  </div>
</article>
